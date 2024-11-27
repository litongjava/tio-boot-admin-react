import React from 'react';
import ApiTableLong from "@/components/common/ApiTableLong";
import {hutu_settings_columns} from "@/pages/website/hutubot/hutubotColumn";
import {beforeHutuSettingCreateRequest, beforeHutuSettingPageRequest} from "@/pages/website/hutubot/hutubotService";

export default () => {
  const from = "setting";
  return (
    <ApiTableLong
      from={from}
      columns={hutu_settings_columns()}
      beforePageRequest={beforeHutuSettingPageRequest}
      beforeCreateRequest={beforeHutuSettingCreateRequest}
    />
  );
};
