import { UserProfile } from "@/entities/user/model/user.schema";
import DisplayField from "./DisplayField";

export default function UserDetails({ user }: { user: UserProfile }) {
  return (
    <div className="grid gap-2">
      <DisplayField orientation="horizontal" label="User ID" value={user.id} />
      <DisplayField orientation="horizontal" label="First name" value={user.firstName!} />
      <DisplayField orientation="horizontal" label="Last name" value={user.lastName!} />
      <DisplayField orientation="horizontal" label="Email" value={user.email!} />
      <DisplayField orientation="horizontal" label="Phone" value={user.phone!} />
      {/* <div>
        <p>Address</p>
        <p>{user.address}</p>
      </div>
      <div>
        <p>City</p>
        <p>{user.city}</p>
      </div>
      <div>
        <p>State</p>
        <p>{user.state}</p>
      </div>
      <div>
        <p>Zip</p>
        <p>{user.zip}</p>
      </div> */}
    </div>
  );
}
