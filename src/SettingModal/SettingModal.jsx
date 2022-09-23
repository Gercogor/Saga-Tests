import React from 'react';
import styles from './SettingModal.module.css'

const SettingModal = ({ visible, setVisible, limit, page, changePage, changeLimit, setApi, api }) => {

    const closeModal = (e) => {
        if (e.target.id === 'modal') setVisible(false)
    }

    return (
        <div data-testid='modal' id='modal' className={styles.modal} style={visible ? { display: 'block' } : { display: 'none' }} onClick={closeModal}>
            <div className={styles.modalInner}>
                <span id='modal' onClick={closeModal} className={styles.closeButton}>&#10060;</span>
                <p>Settings</p>
                <div className={styles.settings}>
                    <label htmlFor="limitInput">Entries per page: </label>
                    <input value={limit} onChange={changeLimit} id='limitInput' type="number" />
                    <br />
                    <label htmlFor="pageInput">Page: </label>
                    <input value={page} onChange={changePage} id='pageInput' type="number" />

                    <p>What loading ????</p>
                    <label htmlFor="">
                        <input type="radio" name="switchAPI" id="posts" value="posts" onChange={setApi} checked={api === 'posts' ? true : false}/> <label htmlFor="posts">posts</label>
                        <input type="radio" name="switchAPI" id="users" value="users" onChange={setApi} checked={api === 'users' ? true : false}/> <label htmlFor="users">users</label>
                        <input type="radio" name="switchAPI" id="todos" value="todos" onChange={setApi} checked={api === 'todos' ? true : false}/> <label htmlFor="todos">todos</label>
                        <input type="radio" name="switchAPI" id="comments" value="comments" onChange={setApi} checked={api === 'comments' ? true : false}/> <label htmlFor="comments">comments</label>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default SettingModal;
