import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = (props) => {  //allowedRoles is a prop that comes from Routes


    const location = useLocation()



    const userData = JSON.parse(localStorage.getItem('user')) || {}  // this will get the user from local storage and put it in userrole object but if user doesnot exist rather than causing null error, it returns a emoty object

    return (
        //if the role we are sending exist as allowed role for that route or not  .. for example we get allowedRoles prop as admin, then we check if admin is included in the roles that are allowed
        (props.allowedRoles.includes(userData?.user?.role))
            ? <Outlet />
            : userData?.token //this will check if the routes are not allowed for that user but the user is looged in then we send them to unauthorized
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                //if there is no user logged in then go to login
                : <Navigate to='/' state={{ from: location }} replace />  //to remember where the user came from and redirect them to login. if they try to go back we need from and replace for it to work

    )
}

export default RequireAuth