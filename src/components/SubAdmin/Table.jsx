import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { DeletesubAdmin } from "../Axios/apis";

const DashTable = ({ user, setState }) => {
  const navigate = useNavigate();
  const Details = (e, data) => {
    navigate(`/subadmin/edit/${e}`, {
      state: data,
    });
  };
  const handleDelete = async (e) => {
    let form = { id: e };

    try {
      const { data } = await DeletesubAdmin(form);
      alert(data.message);
      setState(true);
    } catch (error) {
      console.log(error);
    }
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
              <th>Password</th>
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
                      onClick={() => Details(data?._id, data)}
                    >
                      {id + 1}
                    </td>
                    <td
                      className="Rtable-data"
                      style={{ cursor: "pointer" }}
                      onClick={() => Details(data?._id, data)}
                    >
                      {data?.name}
                    </td>
                    <td
                      className="Rtable-data"
                      style={{ cursor: "pointer" }}
                      onClick={() => Details(data?._id, data)}
                    >
                      {data?.email}
                    </td>
                    <td
                      className="Rtable-data"
                      style={{ cursor: "pointer" }}
                      onClick={() => Details(data?._id, data)}
                    >
                      {data?.number}
                    </td>

                    <td
                      className="Rtable-data"
                      style={{ cursor: "pointer" }}
                      onClick={() => Details(data?._id)}
                    >
                      {data?.password}
                    </td>
                    <td
                      className="Rtable-data"
                      onClick={() => handleDelete(data?._id)}
                      style={{
                        color: "red",
                        cursor: "pointer",
                      }}
                    >
                      Delete user
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
