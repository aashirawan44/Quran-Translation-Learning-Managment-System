import CustomNavbar from "../components/Navbar/CustomNavbar";
import Navbar from "../components/Navbar/Navbar";
import InstructorNavbar from "../components/instructor/InstructorNavbar";
import InstructorProfileForm from "../components/profile-forms/InstructorProfileForm";
import ProfileForm from "../components/profile-forms/ProfileForm";

const InstructorProfilePage = () => {
    return ( 
        <>
        <CustomNavbar/>
        <InstructorProfileForm/>
        </>
     );
}
 
export default InstructorProfilePage;