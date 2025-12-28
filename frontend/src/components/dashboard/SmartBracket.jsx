import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function SmartBracket() {
  const [nodes, setNodes] = useState([
    { id: '1', title: 'QUALIFIER A', date: '20.06', x: 200, y: 300 },
    { id: '2', title: 'QUALIFIER B', date: '21.06', x: 200, y: 500 },
    { id: '3', title: 'SEMI-FINAL', date: '23.06', x: 600, y: 400 }
  ]);
  
  const [connections, setConnections] = useState([
    { from: '1', to: '3' },
    { from: '2', to: '3' }
  ]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const handleNodeClick = (id) => {
    if (selectedNodeId && selectedNodeId !== id) {
      const existingConnIndex = connections.findIndex(
        c => (c.from === selectedNodeId && c.to === id) || (c.from === id && c.to === selectedNodeId)
      );
      if (existingConnIndex !== -1) {
        setConnections(connections.filter((_, i) => i !== existingConnIndex));
      } else {
        setConnections([...connections, { from: selectedNodeId, to: id }]);
      }
    }
    setSelectedNodeId(id);
  };

  const handleDrag = (id, data) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, x: data.x, y: data.y } : n));
  };

  return (
    <div style={{ position: 'relative', userSelect: 'none' }}>
      
      {/* ПАНЕЛЬ УПРАВЛЕНИЯ */}
      <div style={{ 
        marginBottom: '15px', display: 'flex', gap: '10px', 
        background: '#161b22', padding: '12px', borderRadius: '8px', border: '1px solid #30363d' 
      }}>
        <button onClick={() => {
           const newId = Date.now().toString();
           setNodes([...nodes, { id: newId, title: 'NEW NODE', date: '00.00', x: 300, y: 300 }]);
        }} style={{ background: '#238636', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer' }}>
          + Добавить блок
        </button>
        <button 
          onClick={() => {
            setNodes(nodes.filter(n => n.id !== selectedNodeId));
            setConnections(connections.filter(c => c.from !== selectedNodeId && c.to !== selectedNodeId));
            setSelectedNodeId(null);
          }} 
          disabled={!selectedNodeId} 
          style={{ background: selectedNodeId ? '#da3633' : '#21262d', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '6px' }}
        >
          🗑 Удалить
        </button>
      </div>

      <div style={{ width: '100%', height: '650px', background: '#0d1117', borderRadius: '12px', border: '2px solid #30363d', overflow: 'hidden' }}>
        <TransformWrapper
          initialScale={1}
          minScale={0.2}
          maxScale={2}
          panning={{ disabled: !!selectedNodeId }} // ОТКЛЮЧАЕМ ПАНОРАМИРОВАНИЕ, КОГДА ВЫБРАН БЛОК
          limitToBounds={false}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div style={{ position: 'absolute', right: 20, top: 20, zIndex: 100, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <button onClick={() => zoomIn()} style={{ width: '30px', height: '30px', background: '#30363d', color: 'white', border: 'none', borderRadius: '4px' }}>+</button>
                <button onClick={() => zoomOut()} style={{ width: '30px', height: '30px', background: '#30363d', color: 'white', border: 'none', borderRadius: '4px' }}>-</button>
                <button onClick={() => resetTransform()} style={{ width: '30px', height: '30px', background: '#30363d', color: 'white', border: 'none', borderRadius: '4px' }}>⟲</button>
              </div>

              {/* Чтобы снять выделение, кликнув по пустому месту */}
              <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                <div 
                  onClick={() => setSelectedNodeId(null)}
                  style={{ width: '5000px', height: '5000px', position: 'relative', background: '#0d1117', backgroundImage: 'radial-gradient(#30363d 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                >
                  
                  {/* SVG ЛИНИИ */}
                  <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
                    {connections.map((conn, idx) => {
                      const fromNode = nodes.find(n => n.id === conn.from);
                      const toNode = nodes.find(n => n.id === conn.to);
                      if (!fromNode || !toNode) return null;

                      const isHighlighted = selectedNodeId === conn.from || selectedNodeId === conn.to;

                      return (
                        <line 
                          key={idx}
                          x1={fromNode.x + 100} y1={fromNode.y + 50}
                          x2={toNode.x + 100} y2={toNode.y + 50}
                          stroke={isHighlighted ? '#58a6ff' : '#30363d'} 
                          strokeWidth={isHighlighted ? '3' : '1.5'}
                          strokeDasharray={isHighlighted ? '0' : '8,4'}
                          style={{ transition: 'stroke 0.2s' }}
                        />
                      );
                    })}
                  </svg>

                  {/* БЛОКИ */}
                  {nodes.map((node) => (
                    <Draggable 
                      key={node.id} 
                      position={{ x: node.x, y: node.y }}
                      onDrag={(e, data) => handleDrag(node.id, data)}
                      onStart={(e) => {
                        e.stopPropagation(); // Важно! Чтобы клик не улетел на фон
                        handleNodeClick(node.id);
                      }}
                    >
                      <div 
                        onClick={(e) => e.stopPropagation()} // Чтобы не сбрасывался selectedNodeId
                        style={{
                          width: '200px', padding: '15px', background: '#0d1117',
                          border: selectedNodeId === node.id ? '2px solid #58a6ff' : '1px solid #30363d',
                          borderRadius: '8px', position: 'absolute', cursor: 'grab', zIndex: 10,
                          boxShadow: selectedNodeId === node.id ? '0 0 20px rgba(88,166,255,0.3)' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#238636' }}></div>
                        </div>
                        <input defaultValue={node.title} style={{ background: 'none', border: 'none', color: 'white', fontWeight: 'bold', width: '100%', outline: 'none' }} />
                        <input defaultValue={node.date} style={{ background: 'none', border: 'none', color: '#58a6ff', fontSize: '11px', width: '100%' }} />
                      </div>
                    </Draggable>
                  ))}
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
}