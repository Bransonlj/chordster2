import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface ForbiddenPageProps {
  message?: string;
  redirect?: string;
}

export default function ForbiddenPage({ message, redirect }: ForbiddenPageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate(redirect);
    }
  }, [])

  return (
    <div>
      <h2>FORBIDDEN</h2>
      <p>{ message }</p>
      <NavLink to={"/"}>Home</NavLink>
      {
        redirect && <p>
          Redirecting you...
        </p>
      }
    </div>
  )
}
