import dynamic from "next/dynamic";

const EditProfileClient = dynamic(
  () => import("./_components/EditProfileClient"),
  {
    ssr: false,
  }
);

export default function EditProfilePage() {
  return <EditProfileClient />;
}
