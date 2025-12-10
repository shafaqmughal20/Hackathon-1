import React, { useState } from 'react';

interface InteractiveCodeProps {
  code: string;
  language?: string;
  title?: string;
  description?: string;
}

const InteractiveCode: React.FC<InteractiveCodeProps> = ({
  code,
  language = 'python',
  title = 'Interactive Code Example',
  description = 'Modify and run this code to see the results'
}) => {
  const [userCode, setUserCode] = useState(code);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Running code...');

    // Simulate code execution - in a real implementation, this would connect to a backend
    setTimeout(() => {
      setOutput(`Code executed successfully!\n\nOutput would appear here in a real implementation.\n\nActual execution requires a backend service.`);
      setIsRunning(false);
    }, 1500);
  };

  const handleReset = () => {
    setUserCode(code);
    setOutput('');
  };

  return (
    <div className="interactive-code-block">
      <div className="code-header">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>

      <div className="code-editor">
        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          className="code-input"
          rows={10}
          spellCheck="false"
        />
      </div>

      <div className="code-controls">
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="run-button"
        >
          {isRunning ? 'Running...' : 'Run Code'}
        </button>
        <button
          onClick={handleReset}
          className="reset-button"
        >
          Reset
        </button>
      </div>

      <div className="code-output">
        <h5>Output:</h5>
        <pre className="output-content">
          {output || 'Click "Run Code" to see output'}
        </pre>
      </div>

      <div className="code-info">
        <p><strong>Note:</strong> This is a simulation. In a real implementation, code execution would require a backend service for security.</p>
      </div>
    </div>
  );
};

export default InteractiveCode;