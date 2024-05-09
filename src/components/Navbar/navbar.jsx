import styles from "./navbar.module.css";
import BaseSelect from '../Base/select'

const Navbar = ({applicationsData, setSelectedApplicationsId, selectedApplicationsId}) => {

  return (
    <div className={styles.container}>
      <span className={styles.selectLabel}>Applications</span>
      <div className={styles.selectContainer}>
        <BaseSelect value={selectedApplicationsId} options={applicationsData} setValue={(val => setSelectedApplicationsId(val))}/>
    </div>
    </div>
  );
};

export default Navbar;
