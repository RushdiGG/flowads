import React from "react";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DashboardLayout from "../templates/DashboardLayout";
import FeedList from "../organisms/Lists/FeedList";
import ProductListModal from "../organisms/Modals/ProductListModal";
import NewFeedModal from "../organisms/Modals/NewFeedModal";
import CreateAdsModal from "../organisms/Modals/CreateAdsModal";
import AdfeedsModal from "../organisms/Modals/AdfeedsModal";
import { toggleModal } from "../../redux/slices/modalsSlice";

export default function FeedsPage() {
  let d = useDispatch();

  return (
    <DashboardLayout title="Product feeds" className="padding">
      <Typography variant="h4" component="h2">
        Product feeds
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => d(toggleModal({ modal: "NEW_FEED" }))}
      >
        New product feed
      </Button>
      <FeedList />
      <ProductListModal />
      <NewFeedModal />
      <CreateAdsModal />
      <AdfeedsModal />
    </DashboardLayout>
  );
}
