import * as React from 'react';
import { theme, ConfigProvider } from 'antd';
const { useState, useEffect } = React;

export default (Component: any) => {
  return (props: React.PropsWithChildren) => {
    const [isDark, setIsDark] = useState(document.body.classList.contains('theme-dark'));
    useEffect(() => {
      const observer = new MutationObserver(() => {
        setIsDark(document.body.classList.contains('theme-dark'));
      });
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
      });

      return () => {
        observer.disconnect()
      }
    }, []);

    return (
      <ConfigProvider theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}>
        <Component>{props.children}</Component>
      </ConfigProvider>
    )
  }
}