// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const beforePageRequest = (params: any, isRecoveryMode?: boolean, containsUpload?: boolean) => {
  params.idType = 'long';
  if (isRecoveryMode) {
    params.deleted = 1
  } else {
    params.deleted = 0
  }
  return params;
}
export const beforeCreateRequest = (formValues: any) => {
  return {
    ...formValues,
    idType: 'long',
  };
}
