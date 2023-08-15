import React, { useEffect, useState } from "react";
import { MainLayout } from "../components/mainLayout/MainLayout";
import Container from "react-bootstrap/esm/Container";
import { CustomTable } from "../components/CustomTable/customTable";
import { fetchTransactions } from "../helpers/axiosHelpers";
import TransactionForm from "../components/form/TransactionForm.js";

const Dashboard = () => {
  const [trans, setTrans] = useState([]);

  useEffect(() => {
    fetchingTrans();
  }, []);

  const fetchingTrans = async () => {
    const { status, result } = await fetchTransactions();

    status === "success" && setTrans(result);
  };

  return (
    <MainLayout>
      <Container>
        {/* form section */}
        <TransactionForm getTransaction={fetchingTrans} />
        {/* table section  */}
        <div className="ttable">
          <CustomTable trans={trans} getTrans={fetchingTrans} />
        </div>
      </Container>
    </MainLayout>
  );
};
export default Dashboard;
