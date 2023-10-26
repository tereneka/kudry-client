import React from 'react';
import { Link } from 'react-router-dom';
import { registrationRoutes } from '../router/routes';

export default function FixedLinks() {
  return (
    <ul className='root__fixed-links'>
      {/* ссылка для онлайн регистрации */}
      {/* <li>
        <div className='root__fixed-link-pulse'></div>
        <Link
          className="root__fixed-link root__fixed-link_name_reg"
          to={`/online-reg/${registrationRoutes[0].path}`}
          target={"_blank"}>
          online запись
        </Link>
      </li> */}
      <li>
        <Link
          to='#header'
          className='root__fixed-link root__fixed-link_name_up'
        />
      </li>
    </ul>
  );
}
