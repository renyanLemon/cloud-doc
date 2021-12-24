import React, { useRef, useState, useEffect } from "react"
import PropTypes from 'prop-types'
import classNames from "classnames"

import './TabList.scss'

const TabList = ({ files, activeId, unsaveIds, onTabClick, onCloseTab }) => {
  return (
    <ul className="nav nav-pills">
      {
        files.map(file => {

          const withUnsaveMark = unsaveIds.includes(file.id)

          const fClassNames = classNames({
            'nav-link': true,
            'active': file.id === activeId,
            'withUnsaved': withUnsaveMark
          })

          return (
            <li className="nav-item" key={file.id}>
              <a className={fClassNames}
                href="#"
                onClick={(e)=>{
                  e.preventDefault();
                  onTabClick(file.id, 999)
                }}>
                  {file.title}
                <span className="close-icon icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCloseTab(file.id)
                      }}
                > ✕ </span>
                { withUnsaveMark && <span className="rounded-circle unsaved-icon icon"></span> }
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}

TabList.propTypes = {
  files: PropTypes.array,
  activeId: PropTypes.string,
  unsaveIds: PropTypes.array,
  onTabClick: PropTypes.func,
  onCloseTab: PropTypes.func
}

TabList.defaultProps = {
  unsaveIds: []
}

export { TabList }