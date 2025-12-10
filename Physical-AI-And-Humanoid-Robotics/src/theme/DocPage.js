import React from 'react';
import DocPage from '@theme-original/DocPage';
import {useLocation} from '@docusaurus/router';

export default function DocPageWrapper(props) {
  const location = useLocation();

  // Only show the logo container on docs pages, not on the homepage
  const isDocsPage = location.pathname.includes('/docs/');

  return (
    <>
      {isDocsPage && (
        <div style={{
          textAlign: 'center',
          padding: '2rem 0',
          marginBottom: '2rem',
          borderBottom: '2px solid var(--ifm-color-primary)'
        }}>
          <img
            src="/img/logo.svg"
            alt="Physical AI & Humanoid Robotics Logo"
            style={{
              width: '60px',
              height: '60px',
              marginBottom: '1rem',
              display: 'block',
              marginLeft: 0,
              marginRight: 'auto'
            }}
          />
        </div>
      )}
      <DocPage {...props} />
    </>
  );
}