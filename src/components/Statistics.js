import React from 'react'
import ComponentMotionTag from './ComponentMotionTag'

const Statistics = ({ stats }) => {
        const stat_items = stats.map(v => {
                return (
                        <li className="stat-item" key={v.title}>
                                <span className="stat-anim"></span>
                                <span className="stat-num">{v.num}</span>
                                <small className="stat-text">{v.title}</small>
                        </li>
                )
        })
        return (
                <ComponentMotionTag className="stats-area" data-title="Statistics">
                        <ul className="stats">{stat_items}</ul>
                </ComponentMotionTag>
        )
}
export default React.memo(Statistics);