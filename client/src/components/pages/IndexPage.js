import React, { Component, useEffect } from "react";
import { useDispatch } from "react-redux";
import DashboardLayout from "../templates/DashboardLayout";
import Typography from "@material-ui/core/Typography";
import TemplateList from "../organisms/Lists/TemplateList";
import Button from "@material-ui/core/Button";
import NewTemplateModal from "../organisms/Modals/NewTemplateModal";
import { toggleModal } from "../../redux/slices/modalsSlice";

function IndexPage() {
  let d = useDispatch();

  return (
    <DashboardLayout title="Templates" className="padding">
      <Typography variant="h4" component="h2">
        My templates
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => d(toggleModal({ modal: "NEW_TEMPLATE" }))}
      >
        New template
      </Button>
      <TemplateList />
      <NewTemplateModal />
    </DashboardLayout>
  );
}

export default IndexPage;
