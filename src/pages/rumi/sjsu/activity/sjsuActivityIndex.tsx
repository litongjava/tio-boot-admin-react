import React from 'react';
import ApiTableLong from "@/components/common/ApiTableLong";
import {
  collegeActivityBeforeCreateRequest,
  collegeActivityBeforePageRequest
} from "@/pages/rumi/common/collegeActivityService";
import {collegeActivityColumns} from "@/pages/rumi/common/collegeActivityColumn";
import {listSchoolDict} from "@/pages/rumi/dict/school/school_service";


export default () => {
  const from = "rumi_sjsu_activity";

  const [schoolDictOptions, setSchoolDictOptions] = React.useState([]);

  React.useEffect(() => {
    const getSchoolDictOptions = async () => {
      listSchoolDict().then(respVo => {
        if (respVo.ok) {
          let options = respVo.data.map((item: { name: string; id: string; }) => ({
            label: item.name,
            value: item.id,
          }));
          setSchoolDictOptions(options);
        } else {
          console.error("Failed to get school dict")
        }
      })
    };
    getSchoolDictOptions()
  }, []);

  const schoolColumns = {
    "title": "School",
    "dataIndex": "school_id",
    "valueType": "select",
    fieldProps: {
      options: schoolDictOptions
    }
  }

  const columns = [schoolColumns, ...collegeActivityColumns()];
  return (
    <ApiTableLong
      from={from}
      columns={columns}
      beforePageRequest={collegeActivityBeforePageRequest}
      beforeCreateRequest={collegeActivityBeforeCreateRequest}
      containsUpload={true}
    />
  );
};


