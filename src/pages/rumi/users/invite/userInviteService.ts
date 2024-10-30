export const userInviteBeforePageRequest = (params: any, isRecoveryMode?: boolean, containsUpload?: boolean) => {
  params.idType = 'long';
  params.remarkOp = "ct";
  params.orderBy = "update_time";
  params.update_time_type = "string[]";
  params.update_time_op = "bt";
  params.update_time_to_type = "ISO8601";
  params.isAsc = "false";

  if (isRecoveryMode) {
    params.deleted = 1
  } else {
    params.deleted = 0
  }

  params.codeOp = "ct";
  params.usrIdOp = "ct";
  params.ipOp = "ct";
  params.ipRegionOp = "ct";

  return params;
}

export const userInviteBeforeCreateRequest = (params: any, containsUpload?: boolean) => {
  return params;
}
