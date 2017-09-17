import * as React from 'react';
import './result.scss';

interface ResultProps {
  name: string;
  label: string;
}

export default ({ name, label }: ResultProps) => {
  return (
    <div className="result-container">
      <div className="result-name">
        { `Congratulations ${name}!` }
      </div>
      <div className="result-label">
        { label }
      </div>
    </div>
  );
};
