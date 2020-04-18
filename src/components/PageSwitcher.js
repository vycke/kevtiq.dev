import React from 'react';
import { Link } from 'gatsby';

const PageSwitcher = ({ next, prev }) => {
  if (!next && !prev) return null;
  return (
    <section className="switcher">
      {!next && prev && <div />}
      {next && (
        <Link to={next.link} className="next">
          ←<span>{next.title}</span>
        </Link>
      )}
      {prev && (
        <Link to={prev.link} className="previous">
          <span>{prev.title}</span>→
        </Link>
      )}
    </section>
  );
};

export default PageSwitcher;
