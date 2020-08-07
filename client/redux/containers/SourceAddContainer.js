import { connect } from 'react-redux'
import SourceAdd from '../../components/SourceAdd'
import { openModal } from '../actions'

const mapStateToProps = state => ({
    modal: state.modal,
  });
const mapDispatchToProps = { openModal }
  
export default connect(mapStateToProps, mapDispatchToProps)(SourceAdd)