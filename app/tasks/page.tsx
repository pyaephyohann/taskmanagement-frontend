import { Collapse, TableCell, TableRow } from "@mui/material";
import { useRouter } from "next/router";

const Tasks = () => {
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <div>
      <h1 className="text-3xl text-center my-[1.5rem] text-purple-500">
        Project Name
      </h1>
      <div>
        <TableRow>
          <TableCell style={{ paddingBottom: "0", paddingTop: "0" }}>
            <Collapse in={open} timeout="auto" unmountOnExit></Collapse>
          </TableCell>
        </TableRow>
      </div>
    </div>
  );
};

export default Tasks;
