import React from 'react';
import ApiTableLong from "@/components/common/ApiTableLong";
import {userInviteColumns} from "@/pages/rumi/users/invite/userInviteColumn";
import {userInviteBeforeCreateRequest, userInviteBeforePageRequest} from "@/pages/rumi/users/invite/userInviteService";


export default () => {
  const from = "sys_invite_user";
  return (
    <ApiTableLong
      from={from}
      columns={userInviteColumns()}
      beforePageRequest={userInviteBeforePageRequest}
      beforeCreateRequest={userInviteBeforeCreateRequest}
      // containsUpload={true}
    />
  );
};


