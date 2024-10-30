export const collegeActivityBeforePageRequest = (params: any, isRecoveryMode?: boolean, containsUpload?: boolean) => {
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
  params.json_fields_type = 'string[]'

  params.titleOp = "ct";
  params.organizationOp = "ct";
  params.locationOp = "ct";
  params.linkOp = "ct";
  params.descriptionOp = "ct";

  params.start_time_type = "string[]";
  params.start_time_op = "bt";
  params.end_time_type = "string[]";
  params.end_time_op = "bt";

  return params;
}

export const collegeActivityBeforeCreateRequest = (params: any, containsUpload?: boolean) => {
  if(params.start_time){
    params.start_time_to_type = 'ISO8601';
    params.start_time_input_type = 'millisecond';
  }else{
    params.start_time=null
  }
  if(params.end_time){
    params.end_time_to_type = 'ISO8601';
    params.end_time_input_type = 'millisecond';
  }else{
    params.end_time=null
  }

  return params;
}
