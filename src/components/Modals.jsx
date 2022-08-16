import React, { useState } from 'react';
import { Modal } from '@mui/material';

import FormSearch from './formSearchCity/formSearch';
import ModalForm from './modalForm/ModalForm';
import Test from './modalForm/test';


//Modal window close and open

const Modals = ({ isOpen, handleClose }) => {
    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
            >
                <FormSearch />
            </Modal>

        </div>
    );
}

export default Modals;
