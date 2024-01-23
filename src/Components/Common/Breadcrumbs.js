import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb" style = {{marginLeft:'20px'}}>
        <li className="breadcrumb-item">
          <Link to="/"><b>Home</b></Link>
        </li>
        {pathnames.map((value, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={value} className={`breadcrumb-item ${isLast ? 'active' : ''}`} aria-current={isLast ? 'page' : ''}>
              {isLast ? (
              <b>{value}</b>  
              ) : (
                <Link to={routeTo}><b>{value}</b></Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
