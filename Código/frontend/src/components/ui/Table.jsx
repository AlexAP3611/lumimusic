export default function Table({ columns, data, renderActions }) {
    return (
        <div className="rounded-lg overflow-hidden border border-border">
            <table className="w-full text-left text-white border border-gray-200">
                <thead className="text-center bg-surface">
                    <tr>
                        {columns.map(col => (
                            <th key={col.key} className="border p-2">
                                {col.label}
                            </th>
                        ))}
                        <th className="border p-2">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {columns.map(col => (
                                <td key={col.key} className="border p-2">
                                    {row[col.key]}
                                </td>
                            ))}
                            <td className="border p-2">
                                {renderActions(row)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}