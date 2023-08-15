import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { deleteTransaction } from "../../helpers/axiosHelpers";
import { toast } from "react-toastify";

export const CustomTable = ({ trans, getTrans }) => {
  const [itemToDelete, setItemToDelete] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setItemToDelete([...itemToDelete, value]);
    } else {
      setItemToDelete(itemToDelete.filter((_id) => _id !== value));
      setIsAllSelected(false);
    }
  };

  const handleOnAllSelect = (e) => {
    const checked = e.target.checked;

    if (checked) {
      setItemToDelete(trans?.map(({ _id }) => _id));
      setIsAllSelected(true);
    } else {
      setItemToDelete([]);
      setIsAllSelected(false);
    }
  };

  const handleOnDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${itemToDelete.length} transaction(s)`
      )
    ) {
      const { status, message } = await deleteTransaction(itemToDelete);

      toast[status](message);

      status === "success" && getTrans();
    }
  };
  const total = trans.reduce(
    (acc, { type, amount }) =>
      type === "income" ? acc + +amount : acc - +amount,
    0
  );
  return (
    <>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={handleOnAllSelect}
                checked={isAllSelected}
              ></Form.Check>
            </th>
            <th>Name</th>
            <th>Imcome</th>
            <th>Expenses</th>
          </tr>
        </thead>
        <tbody>
          {trans.map((item, i) => (
            <tr key={i} className="fw-bolder">
              <td>
                <Form.Check
                  type="checkbox"
                  value={item._id}
                  onChange={handleOnSelect}
                  checked={itemToDelete.includes(item._id)}
                ></Form.Check>
              </td>
              <td>{item.name}</td>
              {item.type === "income" ? (
                <>
                  {" "}
                  <td className="text-success">{item.amount}</td> <td></td>
                </>
              ) : (
                <>
                  <td></td> <td className="text-danger">-{item.amount}</td>{" "}
                </>
              )}
            </tr>
          ))}

          <tr className="fw-bolder">
            <td colSpan={3}>Total Balance</td>
            <td>{total}</td>
          </tr>
        </tbody>
      </Table>
      {itemToDelete.length ? (
        <div>
          <Button variant="danger" onClick={handleOnDelete}>
            Delete {itemToDelete.length} item(s)
          </Button>
        </div>
      ) : null}
    </>
  );
};
