import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
}

const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h3>Runtime Error</h3>' + err + '</div>'
              console.error(err);
            }
          }, false)
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html; // Resetam iframe-ul pentru scrierea de cod repetitiv
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <iframe
      style={{ backgroundColor: "white" }}
      title="code preview"
      ref={iframe}
      sandbox="allow-scripts"
      srcDoc={html}
    />
  );
};

export default Preview;
