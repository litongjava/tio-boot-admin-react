export const beforeImagePageRequest = (params: any, isRecoveryMode?: boolean, containsUpload?: boolean) => {
  params.idType = "long";
  if (containsUpload) {
    params.json_fields = ["files"];
  }

  if (isRecoveryMode) {
    params.deleted = 1;
  } else {
    params.deleted = 0;
  }
  return params;
};
export const beforeImageCreateRequest = (formValues: any) => {
  return {
    ...formValues,
    idType: "long",
  };
};
