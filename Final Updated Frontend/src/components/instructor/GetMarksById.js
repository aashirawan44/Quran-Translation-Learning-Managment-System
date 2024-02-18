import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMarksById } from '../../redux/actions/marks';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GetMarksById = ({ getMarksById }) => {
  const { markid } = useParams();
  const marksData = useSelector((state) => state.marks.marks);

  useEffect(() => {
    getMarksById(markid);
  }, [getMarksById, markid]);

  if (!marksData || !marksData.students) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Marks Details</h1>
      <h2 className="text-xl mb-2">Total Marks: {marksData.totalMarks}</h2>
      <div className="grid grid-cols-2 gap-4">
        {marksData.students.map((student) => (
          <div key={student._id} className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">{student.student.firstName}</h3>
            <p className="text-gray-700">Obtained Marks: {student.obtainedMarks}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  marksData: state.marksData,
});

const mapDispatchToProps = {
  getMarksById,
};

export default connect(mapStateToProps, mapDispatchToProps)(GetMarksById);
