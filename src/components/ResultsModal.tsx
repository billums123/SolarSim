import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import "../stylesheets/results-modal.css";
import { HeatTransferResults } from "../types";
import Results from "./Results";

interface ResultsModal {
  resultsModalOpen: boolean;
  handleCloseResultsModal: () => void;
  heatTransferResults: HeatTransferResults;
}

const ResultsModal = ({
  resultsModalOpen,
  handleCloseResultsModal,
  heatTransferResults,
}: ResultsModal) => {
  return (
    <Box component="div">
      <Dialog
        fullScreen
        onClose={handleCloseResultsModal}
        open={resultsModalOpen}
        PaperProps={{
          sx: {
            borderRadius: "5px",
            height: { xs: "80%", md: "75%", lg: "75%" },
            width: { xs: "95%", md: "75%", lg: "75%" },
          },
        }}
      >
        <DialogTitle>Results</DialogTitle>
        <DialogContent className="modal-content">
          <Results heatTransferResults={heatTransferResults} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResultsModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResultsModal;
