// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const beforeHutuSettingPageRequest = (params: any, isRecoveryMode?: boolean, containsUpload?: boolean) => {
  if (containsUpload) {
    params.json_fields = ["files"];
  }
  return params;
}
export const beforeHutuSettingCreateRequest = (formValues: any) => {
  return {
    ...formValues,
  };
}
