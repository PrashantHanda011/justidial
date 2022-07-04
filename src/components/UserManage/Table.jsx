import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
// import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

const DashTable = ({ user }) => {
  const navigate = useNavigate();
  const Details = (e) => {
    navigate(`/usermanage/${e}`);
  };
  return (
    <>
      {user?.length !== 0 ? (
        <Table className="report-table-main">
          <thead>
            <tr className="Rtable-header">
              <th>S.no</th>

              <th>User Name</th>
              <th>E-mail</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Plan</th>

              <th>Action</th>
            </tr>
          </thead>
          {user?.map((data, id) => {
            return (
              <>
                <tbody key={id} style={{ border: "none" }}>
                  <tr>
                    <td
                      className="Rtable-data"
                      style={{ cursor: "pointer" }}
                      onClick={() => Details(data?._id)}
                    >
                      {id + 1}
                    </td>
                    <td
                      className="Rtable-data"
                      style={{ cursor: "pointer" }}
                      onClick={() => Details(data?._id)}
                    >
                      {data?.name}
                    </td>
                    <td
                      className="Rtable-data"
                      style={{ cursor: "pointer" }}
                      onClick={() => Details(data?._id)}
                    >
                      {data?.email}
                    </td>
                    <td
                      className="Rtable-data"
                      style={{ cursor: "pointer" }}
                      onClick={() => Details(data?._id)}
                    >
                      {data?.number}
                    </td>

                    <td
                      className="Rtable-data"
                      style={{ cursor: "pointer" }}
                      onClick={() => Details(data?._id)}
                    >
                      {data?.city}, {data?.state}
                    </td>
                    <td
                      className="Rtable-data"
                      style={{ cursor: "pointer" }}
                      onClick={() => Details(data?._id)}
                    >
                      {data?.plan}
                    </td>
                    <td
                      className="Rtable-data"
                      style={{
                        color: "#28318C",
                      }}
                    >
                      Block
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </Table>
      ) : (
        <h2 className="text-center">No User Data To Display</h2>
      )}
    </>
  );
};
export default DashTable;
