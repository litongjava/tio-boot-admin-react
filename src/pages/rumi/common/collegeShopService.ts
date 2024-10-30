export const collegeShopBeforePageRequest = (params: any, isRecoveryMode?: boolean, containsUpload?: boolean) => {
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

  params.json_fields = ["files"];
  params.json_fields_type='string[]'

  params.nameOp = "ct";
  params.addressOp = "ct";
  params.websiteOp = "ct";
  params.phoneOp = "ct";
  params.descriptionOp = "ct";
  params.tagsOp = "ct";
  params.mapUrlOp = "ct";
  return params;
}
