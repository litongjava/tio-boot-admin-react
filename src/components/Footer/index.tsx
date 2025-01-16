import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright="Powered by Tio Boot"
      links={[
        {
          key: 'Tio Boot Admin',
          title: 'Tio Boot Admin',
          href: 'https://github.com/litongjava/tio-boot-admin',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined/>,
          href: 'https://github.com/litongjava/tio-boot-admin',
          blankTarget: true,
        },
        {
          key: 'Tio Boot',
          title: 'Tio Boot',
          href: 'https://tio-boot.com',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
