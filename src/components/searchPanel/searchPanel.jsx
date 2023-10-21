import React from 'react';
import Search from '@/icons/search';
import './searchPanel.css'
import CustomButton from "@/UI/button/button";

const SearchPanel = () => {
    return (
        <div className='search-panel'>
            <div className='search-panel__container'>
                <div className='search-panel__search'>
                    <Search/>
                    <input placeholder='Search'/>
                </div>
                <CustomButton content={
                    <span className='search-panel__button'>
                    Search
                </span>
                }/>
            </div>
        </div>
    );
};

export default SearchPanel;