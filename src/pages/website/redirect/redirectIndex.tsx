import React from 'react';
import {red_book_doamin_redirect_columns} from "@/pages/website/redirect/redirectColumn";
import ApiTableLong from "@/components/common/ApiTableLong";
import {beforeAppUserCreateRequest, beforeAppUserPageRequest} from "@/pages/website/redirect/redirectService";

export default () => {
  const from = "doamin_redirect";
  return (
    <ApiTableLong
      from={from}
      columns={red_book_doamin_redirect_columns()}
      beforePageRequest={beforeAppUserPageRequest}
      beforeCreateRequest={beforeAppUserCreateRequest}
    />
  );
};
