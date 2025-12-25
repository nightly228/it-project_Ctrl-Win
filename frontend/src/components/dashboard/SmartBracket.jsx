import React, { useState } from 'react';
import Draggable from 'react-draggable';

export default function SmartBracket() {
  const [nodes, setNodes] = useState([
    { id: '1', title: 'CORE NODE', date: '20.06', x: 50, y: 150 },
    { id: '2', title: 'ENDPOINT', date: '25.06', x: 450, y: 150 }
  ]);
  
  const [connections, setConnections] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // Логика выделения и переключения связи (Создать/Разорвать)
  const handleNodeClick = (id) => {
    if (selectedNodeId && selectedNodeId !== id) {
      // Ищем, есть ли уже связь между этими двумя блоками
      const existingConnIndex = connections.findIndex(
        c => (c.from === selectedNodeId && c.to === id) || (c.from === id && c.to === selectedNodeId)
      );

      if (existingConnIndex !== -1) {
        // ЕСЛИ СВЯЗЬ ЕСТЬ — УДАЛЯЕМ ЕЁ (Разрыв связи)
        const newConnections = [...connections];
        newConnections.splice(existingConnIndex, 1);
        setConnections(newConnections);
      } else {
        // ЕСЛИ СВЯЗИ НЕТ — СОЗДАЕМ ЕЁ
        setConnections([...connections, { from: selectedNodeId, to: id }]);
      }
      
      // Снимаем выделение после действия или переключаем на новый блок
      setSelectedNodeId(id);
    } else {
      setSelectedNodeId(id);
    }
  };

  const addNode = () => {
    const newId = Date.now().toString();
    const newNode = { id: newId, title: 'NEW DEVICE', date: '00.00', x: 100, y: 100 };
    setNodes([...nodes, newNode]);
    setSelectedNodeId(newId);
  };

  const deleteSelectedNode = () => {
    if (!selectedNodeId) return;
    setNodes(nodes.filter(n => n.id !== selectedNodeId));
    setConnections(connections.filter(c => c.from !== selectedNodeId && c.to !== selectedNodeId));
    setSelectedNodeId(null);
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
        <button onClick={addNode} style={{
          background: '#238636', color: 'white', border: 'none', 
          padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
        }}>
          + Добавить блок
        </button>

        <button 
          onClick={deleteSelectedNode}
          disabled={!selectedNodeId}
          style={{
            background: selectedNodeId ? '#da3633' : '#21262d',
            color: selectedNodeId ? 'white' : '#484f58',
            border: 'none', padding: '10px 18px', borderRadius: '6px', 
            cursor: selectedNodeId ? 'pointer' : 'not-allowed', fontWeight: 'bold'
          }}
        >
          🗑 Удалить выбранный
        </button>

        <div style={{ marginLeft: 'auto', color: '#8b949e', fontSize: '12px', textAlign: 'right' }}>
          <div style={{ color: '#58a6ff', fontWeight: 'bold' }}>СОВЕТ:</div>
          <div>Повторный клик по связанным блокам удаляет линию</div>
        </div>
      </div>

      <div style={{ 
        width: '100%', height: '600px', background: '#0d1117',
        backgroundImage: 'radial-gradient(#30363d 1px, transparent 1px)',
        backgroundSize: '30px 30px', position: 'relative', borderRadius: '8px', border: '1px solid #30363d', overflow: 'hidden'
      }}>
        
        {/* SVG СЛОЙ ДЛЯ СВЯЗЕЙ */}
        <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
          {connections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            return (
              <line 
                key={idx}
                x1={fromNode.x + 100} y1={fromNode.y + 45}
                x2={toNode.x + 100} y2={toNode.y + 45}
                stroke="#f0f6fc"
                strokeWidth="2"
                strokeDasharray="6,4"
              />
            );
          })}
        </svg>

        {/* ОТРИСОВКА БЛОКОВ */}
        {nodes.map((node) => (
          <Draggable 
            key={node.id} 
            position={{ x: node.x, y: node.y }}
            onDrag={(e, data) => handleDrag(node.id, data)}
            onStart={() => handleNodeClick(node.id)}
          >
            <div style={{
              width: '200px', padding: '12px', background: '#0d1117',
              border: selectedNodeId === node.id ? '2px solid #58a6ff' : '1px solid #30363d',
              borderRadius: '6px', position: 'absolute', cursor: 'grab', zIndex: 10,
              boxShadow: selectedNodeId === node.id ? '0 0 15px rgba(88, 166, 255, 0.3)' : 'none'
            }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#238636' }}></div>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#238636' }}></div>
              </div>

              <input 
                defaultValue={node.title}
                onChange={(e) => {
                  const val = e.target.value;
                  setNodes(nodes.map(n => n.id === node.id ? {...n, title: val} : n))
                }}
                style={{ background: 'none', border: 'none', color: 'white', fontWeight: 'bold', width: '100%', outline: 'none', fontSize: '13px' }}
              />
              <input 
                defaultValue={node.date}
                style={{ background: 'none', border: 'none', color: '#58a6ff', width: '100%', outline: 'none', fontSize: '11px', marginTop: '4px' }}
              />

              <div style={{ display: 'flex', gap: '2px', marginTop: '10px', borderTop: '1px solid #21262d', paddingTop: '8px' }}>
                {[1,2,3,4,5,6,7,8].map(i => (
                  <div key={i} style={{ width: '6px', height: '6px', background: '#21262d', border: '1px solid #30363d' }}></div>
                ))}
              </div>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}