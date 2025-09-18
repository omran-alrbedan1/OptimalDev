import dynamic from "next/dynamic";

const EditProfileClient = dynamic(() => import("./EditProfileComponent"), {
  ssr: false,
});

export default function EditProfilePage() {
  return <EditProfileClient />;
}
