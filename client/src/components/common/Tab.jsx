import PropTypes from 'prop-types';
const Tab = ({ accountType, setAccountType, tabData }) => {
  return (
    <div
      className="bg-richblack-800 flex flex-row py-1 px-1 rounded-full gap-4 w-[47%]"
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
    >
      {tabData.map((tab) => (
        <button
          className={`${
            accountType == tab.type ? "bg-richblack-900 text-richblack-5" : ""
          } px-[16px] rounded-full py-[8px] text-richblack-200`}
          onClick={() => setAccountType(tab?.type)}
          key={tab.id}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
};
// props validation
Tab.propTypes = {
    accountType: PropTypes.string.isRequired,
    setAccountType: PropTypes.func.isRequired,
    tabData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        tabName: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  
export default Tab;
