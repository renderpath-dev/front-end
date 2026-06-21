# SellerHub Marketplace API Contract v0.1

## 1. 文档定位

这份文档是 SellerHub Marketplace 的 API 契约文档。它承接 `sellerhub-marketplace-requirements.md` 和 `sellerhub-database-design.md`，用于在正式写代码前固定前后端边界。

它不是后端实现代码，也不是最终 OpenAPI 文件。它先解决这些问题：

1. 每个业务模块需要哪些 endpoint。
2. 每个 endpoint 需要什么权限。
3. request body、route params、query params 的字段是什么。
4. response envelope 的结构是什么。
5. 哪些字段由前端传入，哪些字段只能由后端计算。
6. 哪些接口需要事务（transaction）。
7. 前端 typed API client 和 TanStack Query 应该按什么数据结构写。

本项目的 API 目标不是“能跑就行”，而是让前端、后端、数据库、权限和测试之间形成稳定契约。后面 Codex 写代码时必须围绕这份契约实现，不应该临时发明 response shape。

---

## 2. 总体结论

SellerHub MVP 使用 REST API。

统一前缀：

```txt
/api
```

核心模块：

| 模块 | 作用 |
|---|---|
| Auth API | 注册、登录、退出、获取当前用户 |
| Product API | 商品公开浏览、搜索、详情、seller 商品管理 |
| Shop API | 店铺公开浏览、seller 店铺管理 |
| Category API | 公开分类读取、admin 分类管理 |
| Cart API | buyer 购物车读写 |
| Order API | buyer 下单和订单查看 |
| Seller Order API | seller 查看和处理自己店铺的订单项 |
| Admin API | admin 管理分类、商品状态、店铺状态 |
| Review API | MVP 可选，商品评价 |

最关键的 API 设计结论：

1. 所有 response 都使用统一 envelope。
2. 后端返回给前端的 `User` 永远不包含 `passwordHash`。
3. 前端不能传可信的 `totalCents`、`subtotalCents`、`unitPriceCents`。
4. 下单接口必须由后端读取购物车、读取商品价格、计算总价、扣减库存、创建订单、清空购物车。
5. seller 订单处理按 `OrderItem` 维度更新，不直接让 seller 更新整个 `Order`。
6. seller 权限通过 `Shop.ownerId === currentUser.id` 判断。
7. admin 权限通过 `currentUser.role === ADMIN` 判断。
8. 所有写接口都必须做 runtime validation。
9. 所有受保护接口都必须在后端校验身份和角色。

---

## 3. API 基础约定

## 3.1 Base URL

开发环境建议：

```txt
http://localhost:4000/api
```

前端通过环境变量读取：

```txt
VITE_API_BASE_URL=http://localhost:4000/api
```

生产环境建议由部署平台注入。

---

## 3.2 Authentication 方式

MVP 推荐使用 httpOnly cookie 保存登录凭证。

登录成功后：

```txt
POST /api/auth/login
  -> Set-Cookie
```

前端请求受保护 API 时必须带 credentials：

```ts
fetch(url, {
  credentials: 'include'
});
```

如果后期改成 bearer token，本 API 契约主体不变，只需要替换 auth middleware 和 frontend request interceptor。

### 3.2.1 Cookie 策略

| 环境 | 建议 |
|---|---|
| development | `httpOnly: true`, `sameSite: 'lax'`, `secure: false` |
| production | `httpOnly: true`, `sameSite: 'lax'`, `secure: true` |

### 3.2.2 CORS 要求

当前端和后端不同 origin 时，后端必须允许 credential requests。

```txt
origin = frontend origin
credentials = true
```

---

## 3.3 Content Type

默认 JSON API：

```txt
Content-Type: application/json
```

MVP 暂不实现真实文件上传。商品图片和店铺 logo 先使用 `imageUrl` 字符串。

后期如果加入图片上传，单独增加 upload API，不要把 upload 逻辑混进 product create/update 的 JSON contract。

---

## 3.4 Response Envelope

所有成功响应使用：

```json
{
  "success": true,
  "data": {}
}
```

所有失败响应使用：

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request body",
    "details": {}
  }
}
```

列表响应使用：

```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalItems": 120,
      "totalPages": 6
    }
  }
}
```

---

## 3.5 HTTP Status 与 Error Code

| HTTP status | error.code | 使用场景 |
|---:|---|---|
| 400 | VALIDATION_ERROR | request body、query、params 校验失败 |
| 401 | UNAUTHORIZED | 未登录或登录凭证无效 |
| 403 | FORBIDDEN | 已登录但角色或 ownership 不允许 |
| 404 | NOT_FOUND | 资源不存在或不应该暴露存在性 |
| 409 | CONFLICT | email、slug、cart item 等唯一约束冲突 |
| 422 | BUSINESS_RULE_VIOLATION | 库存不足、商品下架、店铺 suspended 等业务规则失败 |
| 500 | INTERNAL_SERVER_ERROR | 未预期服务端错误 |

### 3.5.1 错误响应示例

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You do not have permission to access this resource",
    "details": {}
  }
}
```

字段级校验错误示例：

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request body",
    "details": {
      "fieldErrors": {
        "email": ["Invalid email address"],
        "password": ["Password must contain at least 8 characters"]
      }
    }
  }
}
```

---

## 3.6 Pagination 约定

默认分页参数：

| Query param | 类型 | 默认值 | 规则 |
|---|---|---:|---|
| page | number | 1 | 大于等于 1 |
| pageSize | number | 20 | 1 到 50 |

分页返回：

```json
{
  "page": 1,
  "pageSize": 20,
  "totalItems": 120,
  "totalPages": 6
}
```

---

## 3.7 Sorting 约定

商品列表支持：

| sort | 说明 |
|---|---|
| newest | 按创建时间倒序 |
| price_asc | 按价格从低到高 |
| price_desc | 按价格从高到低 |

订单列表支持：

| sort | 说明 |
|---|---|
| newest | 按创建时间倒序 |
| oldest | 按创建时间正序 |

---

## 3.8 Public DTO 和 Private Model 的边界

数据库 model 不是 API response。

API 必须返回 DTO（Data Transfer Object），不能直接把 Prisma model 原样返回给前端。

### 3.8.1 PublicUser DTO

```ts
export type PublicUser = {
  id: string;
  name: string;
  email: string;
  role: 'BUYER' | 'SELLER' | 'ADMIN';
  createdAt: string;
};
```

### 3.8.2 ProductSummary DTO

```ts
export type ProductSummary = {
  id: string;
  shopId: string;
  categoryId: string;
  name: string;
  slug: string;
  priceCents: number;
  stock: number;
  imageUrl: string | null;
  status: 'ACTIVE';
  shop: {
    id: string;
    name: string;
    slug: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  createdAt: string;
};
```

---

## 4. Shared Types

## 4.1 Role

```ts
export type Role = 'BUYER' | 'SELLER' | 'ADMIN';
```

## 4.2 ShopStatus

```ts
export type ShopStatus = 'ACTIVE' | 'SUSPENDED';
```

## 4.3 ProductStatus

```ts
export type ProductStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
```

## 4.4 OrderStatus

```ts
export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'COMPLETED'
  | 'CANCELLED';
```

## 4.5 PaymentStatus

```ts
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED';
```

## 4.6 OrderItemStatus

```ts
export type OrderItemStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'COMPLETED'
  | 'CANCELLED';
```

## 4.7 API Envelope Types

```ts
export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiFailure = {
  success: false;
  error: {
    code: ApiErrorCode;
    message: string;
    details?: unknown;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'BUSINESS_RULE_VIOLATION'
  | 'INTERNAL_SERVER_ERROR';
```

---

## 5. Auth API

## 5.1 POST `/api/auth/register`

### 5.1.1 作用

注册新用户。

### 5.1.2 权限

Public。

### 5.1.3 Request Body

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "password": "Password123",
  "role": "BUYER"
}
```

### 5.1.4 Validation

| 字段 | 规则 |
|---|---|
| name | required，2 到 50 字符 |
| email | required，合法 email，唯一 |
| password | required，至少 8 字符 |
| role | optional，只允许 BUYER 或 SELLER |

### 5.1.5 Response `201`

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_123",
      "name": "Ada Lovelace",
      "email": "ada@example.com",
      "role": "BUYER",
      "createdAt": "2026-06-18T00:00:00.000Z"
    }
  }
}
```

### 5.1.6 Error Cases

| 场景 | HTTP | code |
|---|---:|---|
| email 格式错误 | 400 | VALIDATION_ERROR |
| email 已存在 | 409 | CONFLICT |
| role 试图传 ADMIN | 400 | VALIDATION_ERROR |

### 5.1.7 安全规则

- 后端必须 hash password。
- response 永远不返回 `passwordHash`。
- 前端传入 `role: 'ADMIN'` 必须拒绝。

---

## 5.2 POST `/api/auth/login`

### 5.2.1 作用

用户登录，并设置 httpOnly cookie。

### 5.2.2 权限

Public。

### 5.2.3 Request Body

```json
{
  "email": "ada@example.com",
  "password": "Password123"
}
```

### 5.2.4 Response `200`

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_123",
      "name": "Ada Lovelace",
      "email": "ada@example.com",
      "role": "BUYER",
      "createdAt": "2026-06-18T00:00:00.000Z"
    }
  }
}
```

### 5.2.5 Error Cases

| 场景 | HTTP | code |
|---|---:|---|
| email 或 password 为空 | 400 | VALIDATION_ERROR |
| 凭证错误 | 401 | UNAUTHORIZED |

### 5.2.6 前端行为

- 成功后 invalidates `['auth', 'me']`。
- 成功后跳转到来源页面或首页。
- 失败时显示登录错误，不要泄露 email 是否存在。

---

## 5.3 POST `/api/auth/logout`

### 5.3.1 作用

退出登录并清除 cookie。

### 5.3.2 权限

Authenticated。

### 5.3.3 Response `200`

```json
{
  "success": true,
  "data": {
    "message": "Logged out"
  }
}
```

### 5.3.4 前端行为

- 清除本地 auth 相关 query cache。
- 跳转到 login 或 home。

---

## 5.4 GET `/api/auth/me`

### 5.4.1 作用

获取当前登录用户。

### 5.4.2 权限

Authenticated。

### 5.4.3 Response `200`

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_123",
      "name": "Ada Lovelace",
      "email": "ada@example.com",
      "role": "SELLER",
      "createdAt": "2026-06-18T00:00:00.000Z",
      "shop": {
        "id": "shop_123",
        "name": "Ada Studio",
        "slug": "ada-studio",
        "status": "ACTIVE"
      }
    }
  }
}
```

### 5.4.4 Error Cases

| 场景 | HTTP | code |
|---|---:|---|
| 未登录 | 401 | UNAUTHORIZED |

---

## 6. Category API

## 6.1 GET `/api/categories`

### 6.1.1 作用

公开获取分类列表，用于商品筛选和创建商品表单。

### 6.1.2 权限

Public。

### 6.1.3 Response `200`

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "cat_1",
        "name": "Electronics",
        "slug": "electronics"
      }
    ]
  }
}
```

### 6.1.4 前端 Query Key

```ts
['categories']
```

---

## 6.2 POST `/api/admin/categories`

### 6.2.1 作用

Admin 创建分类。

### 6.2.2 权限

Admin only。

### 6.2.3 Request Body

```json
{
  "name": "Electronics",
  "slug": "electronics"
}
```

### 6.2.4 Validation

| 字段 | 规则 |
|---|---|
| name | required，2 到 50 字符，唯一 |
| slug | required，slug 格式，唯一 |

### 6.2.5 Response `201`

```json
{
  "success": true,
  "data": {
    "category": {
      "id": "cat_1",
      "name": "Electronics",
      "slug": "electronics",
      "createdAt": "2026-06-18T00:00:00.000Z"
    }
  }
}
```

---

## 6.3 PATCH `/api/admin/categories/:categoryId`

### 6.3.1 作用

Admin 更新分类。

### 6.3.2 权限

Admin only。

### 6.3.3 Params

| Param | 规则 |
|---|---|
| categoryId | required，存在的 category id |

### 6.3.4 Request Body

```json
{
  "name": "Home Office",
  "slug": "home-office"
}
```

### 6.3.5 Response `200`

```json
{
  "success": true,
  "data": {
    "category": {
      "id": "cat_1",
      "name": "Home Office",
      "slug": "home-office",
      "updatedAt": "2026-06-18T00:00:00.000Z"
    }
  }
}
```

---

## 6.4 DELETE `/api/admin/categories/:categoryId`

### 6.4.1 作用

Admin 删除未被商品使用的分类。

### 6.4.2 权限

Admin only。

### 6.4.3 业务规则

如果分类下已有商品，不能删除。

### 6.4.4 Response `200`

```json
{
  "success": true,
  "data": {
    "deleted": true
  }
}
```

### 6.4.5 Error Cases

| 场景 | HTTP | code |
|---|---:|---|
| 分类不存在 | 404 | NOT_FOUND |
| 分类仍被商品使用 | 422 | BUSINESS_RULE_VIOLATION |
| 非 admin | 403 | FORBIDDEN |

---

## 7. Product API

## 7.1 GET `/api/products`

### 7.1.1 作用

公开商品列表，支持搜索、筛选、排序、分页。

### 7.1.2 权限

Public。

### 7.1.3 Query Params

| Query | 类型 | 必填 | 规则 |
|---|---|---:|---|
| q | string | No | 关键词，最多 100 字符 |
| categoryId | string | No | 分类 ID |
| shopId | string | No | 店铺 ID |
| minPriceCents | number | No | 大于等于 0 |
| maxPriceCents | number | No | 大于等于 minPriceCents |
| sort | string | No | newest / price_asc / price_desc |
| page | number | No | 默认 1 |
| pageSize | number | No | 默认 20，最大 50 |

### 7.1.4 后端查询规则

公开列表只返回：

```txt
Product.status = ACTIVE
Shop.status = ACTIVE
```

### 7.1.5 Response `200`

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "prd_1",
        "shopId": "shop_1",
        "categoryId": "cat_1",
        "name": "Mechanical Keyboard",
        "slug": "mechanical-keyboard",
        "priceCents": 8999,
        "stock": 12,
        "imageUrl": "https://example.com/keyboard.png",
        "status": "ACTIVE",
        "shop": {
          "id": "shop_1",
          "name": "Ada Studio",
          "slug": "ada-studio"
        },
        "category": {
          "id": "cat_1",
          "name": "Electronics",
          "slug": "electronics"
        },
        "createdAt": "2026-06-18T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalItems": 1,
      "totalPages": 1
    }
  }
}
```

### 7.1.6 前端 Query Key

```ts
['products', { q, categoryId, shopId, minPriceCents, maxPriceCents, sort, page, pageSize }]
```

---

## 7.2 GET `/api/products/:productId`

### 7.2.1 作用

公开商品详情。

### 7.2.2 权限

Public。

### 7.2.3 Params

| Param | 规则 |
|---|---|
| productId | required |

### 7.2.4 后端查询规则

普通用户只能读取：

```txt
Product.status = ACTIVE
Shop.status = ACTIVE
```

Seller 自己的 draft 商品详情通过 seller endpoint 读取，不通过这个 public endpoint。

### 7.2.5 Response `200`

```json
{
  "success": true,
  "data": {
    "product": {
      "id": "prd_1",
      "shopId": "shop_1",
      "categoryId": "cat_1",
      "name": "Mechanical Keyboard",
      "slug": "mechanical-keyboard",
      "description": "A compact mechanical keyboard for daily work.",
      "priceCents": 8999,
      "stock": 12,
      "imageUrl": "https://example.com/keyboard.png",
      "status": "ACTIVE",
      "shop": {
        "id": "shop_1",
        "name": "Ada Studio",
        "slug": "ada-studio",
        "status": "ACTIVE"
      },
      "category": {
        "id": "cat_1",
        "name": "Electronics",
        "slug": "electronics"
      },
      "createdAt": "2026-06-18T00:00:00.000Z",
      "updatedAt": "2026-06-18T00:00:00.000Z"
    }
  }
}
```

### 7.2.6 Error Cases

| 场景 | HTTP | code |
|---|---:|---|
| 商品不存在 | 404 | NOT_FOUND |
| 商品不是 ACTIVE | 404 | NOT_FOUND |
| 店铺不是 ACTIVE | 404 | NOT_FOUND |

---

## 7.3 GET `/api/seller/products`

### 7.3.1 作用

Seller 查看自己店铺的商品列表。

### 7.3.2 权限

Seller only。

### 7.3.3 Query Params

| Query | 类型 | 必填 | 规则 |
|---|---|---:|---|
| status | string | No | DRAFT / ACTIVE / ARCHIVED |
| q | string | No | 关键词 |
| page | number | No | 默认 1 |
| pageSize | number | No | 默认 20 |

### 7.3.4 后端查询规则

```txt
Product.shop.ownerId = currentUser.id
```

### 7.3.5 Response `200`

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "prd_1",
        "name": "Mechanical Keyboard",
        "slug": "mechanical-keyboard",
        "priceCents": 8999,
        "stock": 12,
        "status": "ACTIVE",
        "category": {
          "id": "cat_1",
          "name": "Electronics"
        },
        "createdAt": "2026-06-18T00:00:00.000Z",
        "updatedAt": "2026-06-18T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalItems": 1,
      "totalPages": 1
    }
  }
}
```

---

## 7.4 GET `/api/seller/products/:productId`

### 7.4.1 作用

Seller 获取自己商品的编辑详情，包括 draft 和 archived 商品。

### 7.4.2 权限

Seller only，且必须拥有该商品所属店铺。

### 7.4.3 Response `200`

```json
{
  "success": true,
  "data": {
    "product": {
      "id": "prd_1",
      "name": "Mechanical Keyboard",
      "slug": "mechanical-keyboard",
      "description": "A compact mechanical keyboard for daily work.",
      "priceCents": 8999,
      "stock": 12,
      "imageUrl": "https://example.com/keyboard.png",
      "status": "DRAFT",
      "categoryId": "cat_1",
      "shopId": "shop_1",
      "createdAt": "2026-06-18T00:00:00.000Z",
      "updatedAt": "2026-06-18T00:00:00.000Z"
    }
  }
}
```

---

## 7.5 POST `/api/seller/products`

### 7.5.1 作用

Seller 创建商品。

### 7.5.2 权限

Seller only。

### 7.5.3 业务前置条件

- current user must have a shop.
- shop status must be ACTIVE.

### 7.5.4 Request Body

```json
{
  "categoryId": "cat_1",
  "name": "Mechanical Keyboard",
  "slug": "mechanical-keyboard",
  "description": "A compact mechanical keyboard for daily work.",
  "priceCents": 8999,
  "stock": 12,
  "imageUrl": "https://example.com/keyboard.png",
  "status": "DRAFT"
}
```

### 7.5.5 Validation

| 字段 | 规则 |
|---|---|
| categoryId | required，存在的 category |
| name | required，2 到 100 字符 |
| slug | required，在同一个 shop 内唯一 |
| description | required，10 到 2000 字符 |
| priceCents | required，整数，大于 0 |
| stock | required，整数，大于等于 0 |
| imageUrl | optional，合法 URL |
| status | DRAFT 或 ACTIVE，默认 DRAFT |

### 7.5.6 Response `201`

```json
{
  "success": true,
  "data": {
    "product": {
      "id": "prd_1",
      "shopId": "shop_1",
      "categoryId": "cat_1",
      "name": "Mechanical Keyboard",
      "slug": "mechanical-keyboard",
      "description": "A compact mechanical keyboard for daily work.",
      "priceCents": 8999,
      "stock": 12,
      "imageUrl": "https://example.com/keyboard.png",
      "status": "DRAFT",
      "createdAt": "2026-06-18T00:00:00.000Z",
      "updatedAt": "2026-06-18T00:00:00.000Z"
    }
  }
}
```

### 7.5.7 Error Cases

| 场景 | HTTP | code |
|---|---:|---|
| 未登录 | 401 | UNAUTHORIZED |
| 非 seller | 403 | FORBIDDEN |
| 没有 shop | 422 | BUSINESS_RULE_VIOLATION |
| shop suspended | 422 | BUSINESS_RULE_VIOLATION |
| slug 冲突 | 409 | CONFLICT |

### 7.5.8 Cache Invalidation

成功后前端 invalidates：

```ts
['seller', 'products']
['products']
['shops', shopId]
```

---

## 7.6 PATCH `/api/seller/products/:productId`

### 7.6.1 作用

Seller 更新自己的商品。

### 7.6.2 权限

Seller only，且必须拥有该商品所属店铺。

### 7.6.3 Request Body

所有字段 optional，但至少传一个字段。

```json
{
  "name": "Updated Keyboard",
  "description": "An updated mechanical keyboard for daily work.",
  "priceCents": 9999,
  "stock": 8,
  "status": "ACTIVE"
}
```

### 7.6.4 Validation

同 create product，但字段 optional。

### 7.6.5 Response `200`

```json
{
  "success": true,
  "data": {
    "product": {
      "id": "prd_1",
      "name": "Updated Keyboard",
      "priceCents": 9999,
      "stock": 8,
      "status": "ACTIVE",
      "updatedAt": "2026-06-18T00:00:00.000Z"
    }
  }
}
```

### 7.6.6 业务规则

- 更新 `Product.priceCents` 不影响已经存在的 `OrderItem.unitPriceCents`。
- `stock` 不能小于 0。
- `ARCHIVED` 商品不能加入购物车。

---

## 7.7 DELETE `/api/seller/products/:productId`

### 7.7.1 作用

Seller 删除自己的商品。

### 7.7.2 权限

Seller only，且必须拥有该商品所属店铺。

### 7.7.3 MVP 行为

MVP 不做物理删除。该接口把商品状态改为 `ARCHIVED`。

### 7.7.4 Response `200`

```json
{
  "success": true,
  "data": {
    "product": {
      "id": "prd_1",
      "status": "ARCHIVED",
      "updatedAt": "2026-06-18T00:00:00.000Z"
    }
  }
}
```

---

## 8. Shop API

## 8.1 GET `/api/shops`

### 8.1.1 作用

公开店铺列表。

### 8.1.2 权限

Public。

### 8.1.3 Query Params

| Query | 类型 | 必填 | 规则 |
|---|---|---:|---|
| q | string | No | 店铺名搜索 |
| page | number | No | 默认 1 |
| pageSize | number | No | 默认 20 |

### 8.1.4 查询规则

```txt
Shop.status = ACTIVE
```

### 8.1.5 Response `200`

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "shop_1",
        "name": "Ada Studio",
        "slug": "ada-studio",
        "description": "Tools for focused builders.",
        "logoUrl": "https://example.com/logo.png",
        "status": "ACTIVE",
        "createdAt": "2026-06-18T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalItems": 1,
      "totalPages": 1
    }
  }
}
```

---

## 8.2 GET `/api/shops/:shopId`

### 8.2.1 作用

公开店铺详情，并展示该店铺 active products。

### 8.2.2 权限

Public。

### 8.2.3 Response `200`

```json
{
  "success": true,
  "data": {
    "shop": {
      "id": "shop_1",
      "name": "Ada Studio",
      "slug": "ada-studio",
      "description": "Tools for focused builders.",
      "logoUrl": "https://example.com/logo.png",
      "status": "ACTIVE",
      "createdAt": "2026-06-18T00:00:00.000Z"
    },
    "products": [
      {
        "id": "prd_1",
        "name": "Mechanical Keyboard",
        "slug": "mechanical-keyboard",
        "priceCents": 8999,
        "stock": 12,
        "imageUrl": "https://example.com/keyboard.png"
      }
    ]
  }
}
```

---

## 8.3 GET `/api/seller/shop`

### 8.3.1 作用

Seller 获取自己的店铺。

### 8.3.2 权限

Seller only。

### 8.3.3 Response `200`

```json
{
  "success": true,
  "data": {
    "shop": {
      "id": "shop_1",
      "ownerId": "usr_1",
      "name": "Ada Studio",
      "slug": "ada-studio",
      "description": "Tools for focused builders.",
      "logoUrl": "https://example.com/logo.png",
      "status": "ACTIVE",
      "createdAt": "2026-06-18T00:00:00.000Z",
      "updatedAt": "2026-06-18T00:00:00.000Z"
    }
  }
}
```

### 8.3.4 Error Cases

| 场景 | HTTP | code |
|---|---:|---|
| seller 还没有 shop | 404 | NOT_FOUND |

---

## 8.4 POST `/api/seller/shop`

### 8.4.1 作用

Seller 创建自己的店铺。

### 8.4.2 权限

Seller only。

### 8.4.3 Request Body

```json
{
  "name": "Ada Studio",
  "slug": "ada-studio",
  "description": "Tools for focused builders.",
  "logoUrl": "https://example.com/logo.png"
}
```

### 8.4.4 Validation

| 字段 | 规则 |
|---|---|
| name | required，2 到 80 字符 |
| slug | required，全局唯一 |
| description | optional，最多 1000 字符 |
| logoUrl | optional，合法 URL |

### 8.4.5 业务规则

- 一个 seller MVP 阶段只能创建一个 shop。
- 非 seller 不能创建 shop。

### 8.4.6 Response `201`

```json
{
  "success": true,
  "data": {
    "shop": {
      "id": "shop_1",
      "ownerId": "usr_1",
      "name": "Ada Studio",
      "slug": "ada-studio",
      "description": "Tools for focused builders.",
      "logoUrl": "https://example.com/logo.png",
      "status": "ACTIVE",
      "createdAt": "2026-06-18T00:00:00.000Z"
    }
  }
}
```

---

## 8.5 PATCH `/api/seller/shop`

### 8.5.1 作用

Seller 更新自己的店铺。

### 8.5.2 权限

Seller only。

### 8.5.3 Request Body

```json
{
  "name": "Ada Studio Pro",
  "description": "Updated tools for focused builders.",
  "logoUrl": "https://example.com/logo-new.png"
}
```

### 8.5.4 Response `200`

```json
{
  "success": true,
  "data": {
    "shop": {
      "id": "shop_1",
      "name": "Ada Studio Pro",
      "slug": "ada-studio",
      "description": "Updated tools for focused builders.",
      "logoUrl": "https://example.com/logo-new.png",
      "status": "ACTIVE",
      "updatedAt": "2026-06-18T00:00:00.000Z"
    }
  }
}
```

---

## 9. Cart API

## 9.1 GET `/api/cart`

### 9.1.1 作用

获取当前用户购物车。

### 9.1.2 权限

Authenticated buyer or seller。

### 9.1.3 Response `200`

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "cart_1",
        "productId": "prd_1",
        "quantity": 2,
        "product": {
          "id": "prd_1",
          "name": "Mechanical Keyboard",
          "slug": "mechanical-keyboard",
          "priceCents": 8999,
          "stock": 12,
          "imageUrl": "https://example.com/keyboard.png",
          "status": "ACTIVE",
          "shop": {
            "id": "shop_1",
            "name": "Ada Studio"
          }
        },
        "itemSubtotalCents": 17998,
        "isAvailable": true,
        "unavailableReason": null
      }
    ],
    "summary": {
      "totalItems": 2,
      "totalCents": 17998
    }
  }
}
```

### 9.1.4 计算规则

- `itemSubtotalCents` 由后端根据当前商品价格计算。
- `summary.totalCents` 由后端根据购物车 items 计算。
- `isAvailable` 根据 product status、shop status、stock 判断。

### 9.1.5 前端 Query Key

```ts
['cart']
```

---

## 9.2 POST `/api/cart/items`

### 9.2.1 作用

添加商品到购物车。

### 9.2.2 权限

Authenticated buyer or seller。

### 9.2.3 Request Body

```json
{
  "productId": "prd_1",
  "quantity": 1
}
```

### 9.2.4 Validation

| 字段 | 规则 |
|---|---|
| productId | required，存在的 product |
| quantity | required，整数，1 到 99 |

### 9.2.5 业务规则

- 商品必须是 `ACTIVE`。
- 店铺必须是 `ACTIVE`。
- 商品库存必须大于 0。
- 加入后的购物车数量不能超过库存。
- 同一个 user + product 只能有一条 `CartItem`，重复添加时增加 quantity。

### 9.2.6 Response `200` 或 `201`

如果新建 cart item，返回 `201`；如果更新已有 cart item，返回 `200`。

```json
{
  "success": true,
  "data": {
    "item": {
      "id": "cart_1",
      "productId": "prd_1",
      "quantity": 2
    }
  }
}
```

### 9.2.7 Error Cases

| 场景 | HTTP | code |
|---|---:|---|
| 未登录 | 401 | UNAUTHORIZED |
| 商品不存在 | 404 | NOT_FOUND |
| 商品下架 | 422 | BUSINESS_RULE_VIOLATION |
| 店铺 suspended | 422 | BUSINESS_RULE_VIOLATION |
| 超过库存 | 422 | BUSINESS_RULE_VIOLATION |

### 9.2.8 Cache Invalidation

```ts
['cart']
```

---

## 9.3 PATCH `/api/cart/items/:cartItemId`

### 9.3.1 作用

修改购物车项数量。

### 9.3.2 权限

Authenticated owner only。

### 9.3.3 Request Body

```json
{
  "quantity": 3
}
```

### 9.3.4 Validation

| 字段 | 规则 |
|---|---|
| quantity | required，整数，1 到 99 |

### 9.3.5 业务规则

- 只能修改自己的 cart item。
- 数量不能超过当前库存。
- 如果商品已下架，可以选择拒绝更新并提示不可购买。

### 9.3.6 Response `200`

```json
{
  "success": true,
  "data": {
    "item": {
      "id": "cart_1",
      "productId": "prd_1",
      "quantity": 3
    }
  }
}
```

---

## 9.4 DELETE `/api/cart/items/:cartItemId`

### 9.4.1 作用

移除购物车项。

### 9.4.2 权限

Authenticated owner only。

### 9.4.3 Response `200`

```json
{
  "success": true,
  "data": {
    "deleted": true
  }
}
```

---

## 9.5 DELETE `/api/cart`

### 9.5.1 作用

清空当前用户购物车。

### 9.5.2 权限

Authenticated。

### 9.5.3 Response `200`

```json
{
  "success": true,
  "data": {
    "deletedCount": 3
  }
}
```

---

## 10. Order API

## 10.1 POST `/api/orders`

### 10.1.1 作用

从当前用户购物车创建订单。

### 10.1.2 权限

Authenticated buyer or seller。

### 10.1.3 Request Body

前端只传 shipping 信息和 mock payment intention，不传可信金额。

```json
{
  "shippingName": "Ada Lovelace",
  "shippingPhone": "1234567890",
  "shippingAddress": "123 Market Street, San Francisco, CA",
  "mockPaymentResult": "PAID"
}
```

### 10.1.4 Validation

| 字段 | 规则 |
|---|---|
| shippingName | required，2 到 80 字符 |
| shippingPhone | required，5 到 30 字符 |
| shippingAddress | required，10 到 300 字符 |
| mockPaymentResult | required，PAID 或 FAILED |

### 10.1.5 Transaction 行为

该接口必须使用 transaction。

```txt
read current user's cart items
validate cart is not empty
load products with shop data
validate product status
validate shop status
validate stock
calculate order total
create order
create order items with price snapshot
decrease product stock
clear user's cart
return order detail
```

### 10.1.6 Price Rules

- `Order.totalCents` 由后端计算。
- `OrderItem.unitPriceCents` 来自当前 `Product.priceCents`。
- `OrderItem.productName` 保存当前商品名快照。
- `OrderItem.productImageUrl` 保存当前商品图快照。
- 前端传来的任何金额字段都忽略或拒绝。

### 10.1.7 Response `201`

```json
{
  "success": true,
  "data": {
    "order": {
      "id": "ord_1",
      "buyerId": "usr_1",
      "status": "PAID",
      "paymentStatus": "PAID",
      "totalCents": 17998,
      "shippingName": "Ada Lovelace",
      "shippingPhone": "1234567890",
      "shippingAddress": "123 Market Street, San Francisco, CA",
      "items": [
        {
          "id": "item_1",
          "productId": "prd_1",
          "shopId": "shop_1",
          "productName": "Mechanical Keyboard",
          "productImageUrl": "https://example.com/keyboard.png",
          "quantity": 2,
          "unitPriceCents": 8999,
          "subtotalCents": 17998,
          "status": "PENDING"
        }
      ],
      "createdAt": "2026-06-18T00:00:00.000Z"
    }
  }
}
```

### 10.1.8 Error Cases

| 场景 | HTTP | code |
|---|---:|---|
| 未登录 | 401 | UNAUTHORIZED |
| 购物车为空 | 422 | BUSINESS_RULE_VIOLATION |
| 商品下架 | 422 | BUSINESS_RULE_VIOLATION |
| 店铺 suspended | 422 | BUSINESS_RULE_VIOLATION |
| 库存不足 | 422 | BUSINESS_RULE_VIOLATION |
| mock payment failed | 422 | BUSINESS_RULE_VIOLATION |

### 10.1.9 Cache Invalidation

成功后前端 invalidates：

```ts
['cart']
['orders']
['products']
['product', productId]
```

---

## 10.2 GET `/api/orders`

### 10.2.1 作用

Buyer 查看自己的订单列表。

### 10.2.2 权限

Authenticated owner only。

### 10.2.3 Query Params

| Query | 类型 | 必填 | 规则 |
|---|---|---:|---|
| status | string | No | OrderStatus |
| page | number | No | 默认 1 |
| pageSize | number | No | 默认 20 |

### 10.2.4 查询规则

```txt
Order.buyerId = currentUser.id
```

### 10.2.5 Response `200`

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "ord_1",
        "status": "PAID",
        "paymentStatus": "PAID",
        "totalCents": 17998,
        "itemCount": 1,
        "createdAt": "2026-06-18T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalItems": 1,
      "totalPages": 1
    }
  }
}
```

---

## 10.3 GET `/api/orders/:orderId`

### 10.3.1 作用

Buyer 查看自己的订单详情。

### 10.3.2 权限

Authenticated owner only。

### 10.3.3 查询规则

```txt
Order.id = orderId
Order.buyerId = currentUser.id
```

### 10.3.4 Response `200`

```json
{
  "success": true,
  "data": {
    "order": {
      "id": "ord_1",
      "status": "PAID",
      "paymentStatus": "PAID",
      "totalCents": 17998,
      "shippingName": "Ada Lovelace",
      "shippingPhone": "1234567890",
      "shippingAddress": "123 Market Street, San Francisco, CA",
      "items": [
        {
          "id": "item_1",
          "productId": "prd_1",
          "shopId": "shop_1",
          "productName": "Mechanical Keyboard",
          "productImageUrl": "https://example.com/keyboard.png",
          "quantity": 2,
          "unitPriceCents": 8999,
          "subtotalCents": 17998,
          "status": "PENDING",
          "shop": {
            "id": "shop_1",
            "name": "Ada Studio"
          }
        }
      ],
      "createdAt": "2026-06-18T00:00:00.000Z"
    }
  }
}
```

---

## 11. Seller Order API

## 11.1 GET `/api/seller/orders`

### 11.1.1 作用

Seller 查看自己店铺相关订单项。注意：多商家 marketplace 中，同一个 order 可能包含多个 shop 的商品，所以 seller dashboard 应该以 `OrderItem` 为主。

### 11.1.2 权限

Seller only。

### 11.1.3 Query Params

| Query | 类型 | 必填 | 规则 |
|---|---|---:|---|
| status | string | No | OrderItemStatus |
| page | number | No | 默认 1 |
| pageSize | number | No | 默认 20 |

### 11.1.4 查询规则

```txt
OrderItem.shop.ownerId = currentUser.id
```

### 11.1.5 Response `200`

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "item_1",
        "orderId": "ord_1",
        "productId": "prd_1",
        "productName": "Mechanical Keyboard",
        "productImageUrl": "https://example.com/keyboard.png",
        "quantity": 2,
        "unitPriceCents": 8999,
        "subtotalCents": 17998,
        "status": "PENDING",
        "order": {
          "id": "ord_1",
          "buyer": {
            "id": "usr_1",
            "name": "Ada Lovelace"
          },
          "shippingName": "Ada Lovelace",
          "shippingPhone": "1234567890",
          "shippingAddress": "123 Market Street, San Francisco, CA",
          "createdAt": "2026-06-18T00:00:00.000Z"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalItems": 1,
      "totalPages": 1
    }
  }
}
```

---

## 11.2 GET `/api/seller/order-items/:orderItemId`

### 11.2.1 作用

Seller 查看自己店铺的某个订单项详情。

### 11.2.2 权限

Seller only，且必须拥有该 order item 对应 shop。

### 11.2.3 查询规则

```txt
OrderItem.id = orderItemId
OrderItem.shop.ownerId = currentUser.id
```

### 11.2.4 Response `200`

```json
{
  "success": true,
  "data": {
    "orderItem": {
      "id": "item_1",
      "orderId": "ord_1",
      "productId": "prd_1",
      "productName": "Mechanical Keyboard",
      "quantity": 2,
      "unitPriceCents": 8999,
      "subtotalCents": 17998,
      "status": "PENDING",
      "order": {
        "id": "ord_1",
        "buyer": {
          "id": "usr_1",
          "name": "Ada Lovelace",
          "email": "ada@example.com"
        },
        "shippingName": "Ada Lovelace",
        "shippingPhone": "1234567890",
        "shippingAddress": "123 Market Street, San Francisco, CA",
        "createdAt": "2026-06-18T00:00:00.000Z"
      }
    }
  }
}
```

---

## 11.3 PATCH `/api/seller/order-items/:orderItemId/status`

### 11.3.1 作用

Seller 更新自己店铺订单项的处理状态。

### 11.3.2 权限

Seller only，且必须拥有该 order item 对应 shop。

### 11.3.3 Request Body

```json
{
  "status": "PROCESSING"
}
```

### 11.3.4 Validation

允许值：

```txt
PROCESSING
SHIPPED
COMPLETED
CANCELLED
```

### 11.3.5 状态流转规则

| 当前状态 | 允许变成 |
|---|---|
| PENDING | PROCESSING / CANCELLED |
| PROCESSING | SHIPPED / CANCELLED |
| SHIPPED | COMPLETED |
| COMPLETED | none |
| CANCELLED | none |

### 11.3.6 Response `200`

```json
{
  "success": true,
  "data": {
    "orderItem": {
      "id": "item_1",
      "status": "PROCESSING",
      "updatedAt": "2026-06-18T00:00:00.000Z"
    }
  }
}
```

### 11.3.7 Order Global Status Sync

MVP 可以在更新 order item 后同步计算 `Order.status`：

| 所有 item 状态 | Order.status |
|---|---|
| all COMPLETED | COMPLETED |
| any SHIPPED | SHIPPED |
| any PROCESSING | PROCESSING |
| all CANCELLED | CANCELLED |
| otherwise | PAID |

如果后期需要更严谨，可以保留 `Order.status` 作为 buyer 视角整体状态，`OrderItem.status` 作为 seller fulfillment 状态。

---

## 12. Admin API

## 12.1 GET `/api/admin/dashboard`

### 12.1.1 作用

Admin dashboard 汇总数据。

### 12.1.2 权限

Admin only。

### 12.1.3 Response `200`

```json
{
  "success": true,
  "data": {
    "metrics": {
      "totalUsers": 20,
      "totalShops": 4,
      "suspendedShops": 1,
      "totalProducts": 120,
      "activeProducts": 90,
      "archivedProducts": 10,
      "totalOrders": 45
    }
  }
}
```

---

## 12.2 GET `/api/admin/products`

### 12.2.1 作用

Admin 查看所有商品。

### 12.2.2 权限

Admin only。

### 12.2.3 Query Params

| Query | 类型 | 必填 | 规则 |
|---|---|---:|---|
| status | string | No | DRAFT / ACTIVE / ARCHIVED |
| q | string | No | 关键词 |
| shopId | string | No | 店铺 ID |
| categoryId | string | No | 分类 ID |
| page | number | No | 默认 1 |
| pageSize | number | No | 默认 20 |

### 12.2.4 Response `200`

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "prd_1",
        "name": "Mechanical Keyboard",
        "status": "ACTIVE",
        "priceCents": 8999,
        "stock": 12,
        "shop": {
          "id": "shop_1",
          "name": "Ada Studio",
          "status": "ACTIVE"
        },
        "category": {
          "id": "cat_1",
          "name": "Electronics"
        },
        "createdAt": "2026-06-18T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalItems": 1,
      "totalPages": 1
    }
  }
}
```

---

## 12.3 PATCH `/api/admin/products/:productId/status`

### 12.3.1 作用

Admin 更新商品状态。

### 12.3.2 权限

Admin only。

### 12.3.3 Request Body

```json
{
  "status": "ARCHIVED"
}
```

### 12.3.4 Response `200`

```json
{
  "success": true,
  "data": {
    "product": {
      "id": "prd_1",
      "status": "ARCHIVED",
      "updatedAt": "2026-06-18T00:00:00.000Z"
    }
  }
}
```

### 12.3.5 Cache Invalidation

```ts
['products']
['product', productId]
['admin', 'products']
```

---

## 12.4 GET `/api/admin/shops`

### 12.4.1 作用

Admin 查看所有店铺。

### 12.4.2 权限

Admin only。

### 12.4.3 Query Params

| Query | 类型 | 必填 | 规则 |
|---|---|---:|---|
| status | string | No | ACTIVE / SUSPENDED |
| q | string | No | 关键词 |
| page | number | No | 默认 1 |
| pageSize | number | No | 默认 20 |

### 12.4.4 Response `200`

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "shop_1",
        "name": "Ada Studio",
        "slug": "ada-studio",
        "status": "ACTIVE",
        "owner": {
          "id": "usr_1",
          "name": "Grace Hopper",
          "email": "grace@example.com"
        },
        "createdAt": "2026-06-18T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalItems": 1,
      "totalPages": 1
    }
  }
}
```

---

## 12.5 PATCH `/api/admin/shops/:shopId/status`

### 12.5.1 作用

Admin 更新店铺状态。

### 12.5.2 权限

Admin only。

### 12.5.3 Request Body

```json
{
  "status": "SUSPENDED"
}
```

### 12.5.4 业务影响

当 shop 被 suspended：

- 公开商品列表不显示该 shop 的商品。
- 该 seller 不能创建新商品。
- 已有购物车项在 checkout 时会失败。

### 12.5.5 Response `200`

```json
{
  "success": true,
  "data": {
    "shop": {
      "id": "shop_1",
      "status": "SUSPENDED",
      "updatedAt": "2026-06-18T00:00:00.000Z"
    }
  }
}
```

---

## 13. Review API MVP Optional

Review 不是 MVP 必须功能。只有完成 auth、product、cart、order、seller/admin 之后再实现。

## 13.1 GET `/api/products/:productId/reviews`

### 13.1.1 作用

读取商品公开评价。

### 13.1.2 权限

Public。

### 13.1.3 Response `200`

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "rev_1",
        "rating": 5,
        "comment": "Great product.",
        "user": {
          "id": "usr_1",
          "name": "Ada Lovelace"
        },
        "createdAt": "2026-06-18T00:00:00.000Z"
      }
    ]
  }
}
```

---

## 13.2 POST `/api/products/:productId/reviews`

### 13.2.1 作用

Buyer 创建商品评价。

### 13.2.2 权限

Authenticated buyer or seller。

### 13.2.3 MVP 可选业务规则

- 用户必须买过该 product。
- 同一个 user 对同一个 product 只能评价一次。

### 13.2.4 Request Body

```json
{
  "rating": 5,
  "comment": "Great product."
}
```

---

## 14. Authorization Rules by Endpoint

| Endpoint pattern | Required auth | Required role | Ownership rule |
|---|---:|---|---|
| `GET /api/products` | No | None | None |
| `GET /api/products/:productId` | No | None | Only active product and active shop |
| `POST /api/seller/products` | Yes | SELLER | User must own active shop |
| `PATCH /api/seller/products/:productId` | Yes | SELLER | Product shop owner must be current user |
| `DELETE /api/seller/products/:productId` | Yes | SELLER | Product shop owner must be current user |
| `GET /api/cart` | Yes | BUYER or SELLER | Cart items belong to current user |
| `POST /api/cart/items` | Yes | BUYER or SELLER | Cart belongs to current user |
| `POST /api/orders` | Yes | BUYER or SELLER | Cart belongs to current user |
| `GET /api/orders` | Yes | BUYER or SELLER | Order buyer must be current user |
| `GET /api/orders/:orderId` | Yes | BUYER or SELLER | Order buyer must be current user |
| `GET /api/seller/orders` | Yes | SELLER | OrderItem shop owner must be current user |
| `PATCH /api/seller/order-items/:orderItemId/status` | Yes | SELLER | OrderItem shop owner must be current user |
| `/api/admin/*` | Yes | ADMIN | None |

---

## 15. Request Validation Rules

## 15.1 Runtime Validation Boundary

TypeScript 类型只能在编译期检查。API request 来自网络，运行时仍然是 untrusted data。

因此每个写接口必须使用 runtime validation：

| Input source | 是否可信 | 处理方式 |
|---|---:|---|
| request body | No | validate with schema |
| route params | No | validate with schema |
| query params | No | validate with schema |
| cookie/session | No | verify and load user |
| database result | Mostly trusted | still handle null cases |

## 15.2 Validation 失败规则

Validation 失败统一返回：

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request body",
    "details": {
      "fieldErrors": {}
    }
  }
}
```

---

## 16. Frontend API Client Contract

## 16.1 API Client 责任

前端 API client 负责：

1. 拼接 base URL。
2. 添加 credentials。
3. 解析 response envelope。
4. 对 `success: false` 抛出 typed error。
5. 不在组件里重复写 fetch 细节。

## 16.2 Base Client Shape

```ts
export async function apiRequest<TResponse>(
  path: string,
  options: RequestInit = {}
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  const payload = await response.json();

  if (!payload.success) {
    throw new ApiError(payload.error, response.status);
  }

  return payload.data as TResponse;
}
```

## 16.3 Query Key 约定

| 数据 | Query key |
|---|---|
| current user | `['auth', 'me']` |
| categories | `['categories']` |
| product list | `['products', filters]` |
| product detail | `['product', productId]` |
| shop detail | `['shop', shopId]` |
| seller shop | `['seller', 'shop']` |
| seller products | `['seller', 'products', filters]` |
| cart | `['cart']` |
| buyer orders | `['orders', filters]` |
| buyer order detail | `['order', orderId]` |
| seller order items | `['seller', 'order-items', filters]` |
| admin products | `['admin', 'products', filters]` |
| admin shops | `['admin', 'shops', filters]` |

---

## 17. API Test Requirements

## 17.1 Auth Tests

| Case | Expected |
|---|---|
| register valid user | 201 |
| register duplicate email | 409 |
| register with ADMIN role | 400 |
| login valid user | 200 and cookie |
| login invalid password | 401 |
| me without login | 401 |
| logout | 200 |

## 17.2 Product Tests

| Case | Expected |
|---|---|
| public list only returns active products from active shops | 200 |
| seller creates product with active shop | 201 |
| seller without shop creates product | 422 |
| suspended seller shop creates product | 422 |
| seller updates own product | 200 |
| seller updates another seller product | 403 |
| delete product archives product | 200 |

## 17.3 Cart Tests

| Case | Expected |
|---|---|
| add active product to cart | 201 or 200 |
| add archived product | 422 |
| add product from suspended shop | 422 |
| add quantity beyond stock | 422 |
| update own cart item | 200 |
| update another user's cart item | 403 or 404 |
| remove own cart item | 200 |

## 17.4 Order Tests

| Case | Expected |
|---|---|
| create order from valid cart | 201 |
| create order with empty cart | 422 |
| create order with insufficient stock | 422 |
| create order decreases stock | true |
| create order clears cart | true |
| create order stores price snapshot | true |
| buyer reads own order | 200 |
| buyer reads another user's order | 403 or 404 |

## 17.5 Seller Order Tests

| Case | Expected |
|---|---|
| seller sees own shop order items | 200 |
| seller does not see other shop order items | true |
| seller updates own order item status | 200 |
| seller updates another shop order item | 403 or 404 |
| invalid status transition | 422 |

## 17.6 Admin Tests

| Case | Expected |
|---|---|
| admin creates category | 201 |
| non-admin creates category | 403 |
| admin suspends shop | 200 |
| suspended shop products disappear from public list | true |
| admin archives product | 200 |

---

## 18. Endpoint Summary

| Method | Endpoint | Auth | Role | Purpose |
|---|---|---:|---|---|
| POST | `/api/auth/register` | No | None | Register user |
| POST | `/api/auth/login` | No | None | Login user |
| POST | `/api/auth/logout` | Yes | Any | Logout user |
| GET | `/api/auth/me` | Yes | Any | Current user |
| GET | `/api/categories` | No | None | Public categories |
| GET | `/api/products` | No | None | Public product list |
| GET | `/api/products/:productId` | No | None | Public product detail |
| GET | `/api/shops` | No | None | Public shop list |
| GET | `/api/shops/:shopId` | No | None | Public shop detail |
| GET | `/api/seller/shop` | Yes | SELLER | Seller shop |
| POST | `/api/seller/shop` | Yes | SELLER | Create seller shop |
| PATCH | `/api/seller/shop` | Yes | SELLER | Update seller shop |
| GET | `/api/seller/products` | Yes | SELLER | Seller product list |
| GET | `/api/seller/products/:productId` | Yes | SELLER | Seller product detail |
| POST | `/api/seller/products` | Yes | SELLER | Create product |
| PATCH | `/api/seller/products/:productId` | Yes | SELLER | Update product |
| DELETE | `/api/seller/products/:productId` | Yes | SELLER | Archive product |
| GET | `/api/cart` | Yes | BUYER/SELLER | Read cart |
| POST | `/api/cart/items` | Yes | BUYER/SELLER | Add cart item |
| PATCH | `/api/cart/items/:cartItemId` | Yes | BUYER/SELLER | Update cart item |
| DELETE | `/api/cart/items/:cartItemId` | Yes | BUYER/SELLER | Delete cart item |
| DELETE | `/api/cart` | Yes | BUYER/SELLER | Clear cart |
| POST | `/api/orders` | Yes | BUYER/SELLER | Create order |
| GET | `/api/orders` | Yes | BUYER/SELLER | Buyer order list |
| GET | `/api/orders/:orderId` | Yes | BUYER/SELLER | Buyer order detail |
| GET | `/api/seller/orders` | Yes | SELLER | Seller order items |
| GET | `/api/seller/order-items/:orderItemId` | Yes | SELLER | Seller order item detail |
| PATCH | `/api/seller/order-items/:orderItemId/status` | Yes | SELLER | Update order item status |
| GET | `/api/admin/dashboard` | Yes | ADMIN | Admin metrics |
| POST | `/api/admin/categories` | Yes | ADMIN | Create category |
| PATCH | `/api/admin/categories/:categoryId` | Yes | ADMIN | Update category |
| DELETE | `/api/admin/categories/:categoryId` | Yes | ADMIN | Delete category |
| GET | `/api/admin/products` | Yes | ADMIN | Admin product list |
| PATCH | `/api/admin/products/:productId/status` | Yes | ADMIN | Update product status |
| GET | `/api/admin/shops` | Yes | ADMIN | Admin shop list |
| PATCH | `/api/admin/shops/:shopId/status` | Yes | ADMIN | Update shop status |

---

## 19. Implementation Order

API 实现建议按这个顺序：

```txt
auth
categories
shops
products
cart
orders
seller order items
admin status management
reviews optional
```

原因：

1. Auth 是所有 protected API 的前置。
2. Category、Shop、Product 是 marketplace 商品体系前置。
3. Cart 依赖 Product。
4. Order 依赖 Cart、Product、Shop、User。
5. Seller order management 依赖 OrderItem。
6. Admin status management 可以在核心流程后补。

---

## 20. Codex Implementation Notes

后面让 Codex 实现 API 时，prompt 必须明确：

1. 不要直接返回 Prisma model。
2. 不要返回 `passwordHash`。
3. 所有 request body、params、query 都要 validation。
4. 所有 service 函数都要区分 auth、validation、business rule、database error。
5. 下单必须使用 transaction。
6. seller 权限必须从 database ownership 判断。
7. admin 权限必须在 middleware 检查。
8. error response 必须符合本文件 envelope。
9. 前端 API client 必须按 response envelope 解析。
10. 代码、注释、变量名必须使用英文。

---

## 21. Interview Explanation Checklist

完成 API 后，必须能解释：

| 问题 | 必须能回答的重点 |
|---|---|
| 为什么 API 不直接返回 Prisma model？ | DTO 边界、安全字段、前端稳定契约 |
| 为什么前端不能传 totalCents？ | 金额必须由后端从数据库可信数据计算 |
| 为什么下单要 transaction？ | 订单、订单项、库存、购物车必须一致 |
| 为什么 seller 更新 OrderItem 而不是 Order？ | 多商家订单中一个 order 可能包含多个 shop |
| 为什么 `GET /api/products` 不返回 draft 商品？ | public endpoint 只展示 active product 和 active shop |
| 为什么删除商品是 archive？ | 保留历史订单引用和商品快照 |
| TypeScript 和 Zod 分别解决什么？ | TypeScript 编译期，Zod 运行时边界 |
| 为什么权限不能只靠前端路由？ | 前端可被绕过，后端是安全边界 |
| 为什么 cart total 可以返回但不能信任？ | 它是 server-calculated display data，不是 checkout truth |
| 为什么错误要统一 envelope？ | 前端可以用统一错误处理和表单映射 |

---

## 22. 最终记忆模型

SellerHub API 的核心不是 endpoint 数量，而是边界清楚：

```txt
browser sends untrusted input
  -> route validates params and body
  -> auth middleware loads current user
  -> role middleware checks role
  -> service checks business rules
  -> database transaction changes state
  -> mapper returns safe DTO
  -> response envelope gives stable frontend contract
```

Marketplace 最关键的 API 是 checkout：

```txt
cart is intent
product is current sellable data
order is purchase record
order item is historical snapshot
stock is protected server state
total is server-calculated money
```

只要这些边界不乱，前端、后端、测试、面试解释都会稳定。
