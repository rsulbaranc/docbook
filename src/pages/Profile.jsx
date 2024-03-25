import { Link } from 'react-router-dom';
import { Card, Input, Label } from '../components/ui';
import { useAuth } from '../context/AuthContext';

export const Profile = () => {

  const {user} = useAuth();

  return (
    <div>

<Card>

<div className="text-4xl font-bold my-2 text-center">
<h1 >Profile</h1>
<h2 className='text-2xl font-light'>Welcome {user.profile} {user.name}!</h2>
</div>


<div className='flex justify-center items-center'>
<div className='w-full flex flex-col justify-center items-center'>
  <Label htmlFor="profile">Profile</Label>
  <Input type="text" value={user.profile} style={{width: "60%"}} />

  <Label htmlFor="name">Name</Label>
  <Input type="text" value={user.name} style={{width: "60%"}} />
</div>

<div className='w-full flex flex-col justify-center items-center'>
  <Label htmlFor="id">id</Label>
  <Input type="text" value={user.id} style={{width: "60%"}} />

  <Label htmlFor="email">Email</Label>
  <Input type="email" value={user.email} style={{width: "60%"}} />
</div>

</div>
<div className="flex my-4 items-center justify-center">
  <Link to="/register" className="font-bold">
    Go to home
  </Link>
</div>



</Card>
      </div>
  )
}
