import Navbar from "../components/Navbar/Navbar";
import InstructorNavbar from "../components/instructor/InstructorNavbar";
import InstructorProfileForm from "../components/profile-forms/InstructorProfileForm";
import ProfileForm from "../components/profile-forms/ProfileForm";

const InstructorProfilePage = () => {
    return ( 
        <>
        <InstructorNavbar/>
        <InstructorProfileForm/>
        </>
     );
}
 
export default InstructorProfilePage;