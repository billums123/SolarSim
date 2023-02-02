import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";
import "../stylesheets/results-modal.css";
import { FormValues, HeatTransferResults } from "../types";
import ResultsChart from "./ResultsChart";
import ResultsParametersTable from "./ResultsParametersTable";
import ResultsTable from "./ResultsTable";

interface ResultsModal {
  resultsModalOpen: boolean;
  handleCloseResultsModal: () => void;
  formValues: FormValues;
  heatTransferResults: HeatTransferResults;
}

const ResultsModal = ({
  resultsModalOpen,
  handleCloseResultsModal,
  formValues,
  heatTransferResults,
}: ResultsModal) => {
  return (
    <Box component="div" className="results-modal">
      <Dialog
        fullScreen
        onClose={handleCloseResultsModal}
        open={resultsModalOpen}
        PaperProps={{
          sx: {
            borderRadius: "5px",
            height: { xs: "80%", md: "75%", lg: "90%" },
            width: { xs: "95%", md: "75%", lg: "75%" },
          },
        }}
      >
        <DialogTitle>Results</DialogTitle>
        <Divider />
        <DialogContent className="modal-content">
          <Box component="div" className="left-side">
            <ResultsChart heatTransferResults={heatTransferResults} />
            <Divider />
            <ResultsParametersTable
              formValues={formValues}
              heatTransferResults={heatTransferResults}
            />
          </Box>
          <Box component="div" className="right-side">
            <ResultsTable
              formValues={formValues}
              heatTransferResults={heatTransferResults}
            />
          </Box>
        </DialogContent>
        <DialogActions className="close-button">
          <Button size="large" sx={{ mr: 2 }} onClick={handleCloseResultsModal}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResultsModal;
