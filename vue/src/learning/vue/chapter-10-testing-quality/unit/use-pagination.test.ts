import { describe, expect, it } from "vitest";
import { reactive } from "vue";
import { useAdminPagination } from "../../chapter-08-admin-ui-forms/composables/useAdminPagination";
import { createPaginationRows } from "../vitest/testFactories";

describe("useAdminPagination", () => {
  it("returns total and the first visible page", () => {
    const rows = createPaginationRows(12);
    const pagination = reactive({ page: 1, pageSize: 5 });
    const { total, visibleRows } = useAdminPagination(rows, pagination);

    expect(total.value).toBe(12);
    expect(visibleRows.value.map((row) => row.id)).toEqual([
      "row-1",
      "row-2",
      "row-3",
      "row-4",
      "row-5",
    ]);
  });

  it("reacts to page and page-size changes", () => {
    const rows = createPaginationRows(12);
    const pagination = reactive({ page: 2, pageSize: 5 });
    const { visibleRows } = useAdminPagination(rows, pagination);

    expect(visibleRows.value[0]?.id).toBe("row-6");

    pagination.page = 1;
    pagination.pageSize = 10;

    expect(visibleRows.value).toHaveLength(10);
    expect(visibleRows.value.at(-1)?.id).toBe("row-10");
  });
});
