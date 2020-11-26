import React, { useEffect, useState } from 'react';

import UserService from '../services/user-service';

const BoardAdmin = () => {
  const [content, setContent] = useState();
  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (err) => {
        const resMessage =
          err?.response?.data?.message ||
          err.message ||
          String(err);

        setContent(resMessage);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardAdmin;
