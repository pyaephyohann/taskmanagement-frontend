import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

const TaskCollapseContainer = () => {
  return (
    <div>
      <div className="bg-[#EFF3EA] p-[0.8rem]">
        <h3>Task Name</h3>
        <div>
          <div>Pending</div>
          <ExpandCircleDownIcon />
        </div>
      </div>
    </div>
  );
};

export default TaskCollapseContainer;
