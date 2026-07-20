type ApiSuccess<TData> = {
  ok: true;
  data: TData;
};

type ApiError = {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: unknown[];
  };
};

type NoteResponseDto = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

type NoteApiResponse = ApiSuccess<NoteResponseDto> | ApiError;

function sendOpenApiShapedResponse(note: NoteResponseDto): NoteApiResponse {
  return {
    ok: true,
    data: note
  };
}

const response = sendOpenApiShapedResponse({
  id: "note_1",
  title: "OpenAPI contract",
  body: "OpenAPI describes this shape but does not validate runtime values by itself.",
  createdAt: "2026-07-14T00:00:00.000Z",
  updatedAt: "2026-07-14T00:00:00.000Z"
});

console.log(response);
