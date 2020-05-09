module Api
  module V2
    class GraphqlController < ApiController
      include Graphable

      protect_from_forgery with: :null_session

      def execute
        variables = ensure_hash(params[:variables])
        query = params[:query]
        operation_name = params[:operationName]
        context = {
          session: session,
          current_user: current_user
        }
        result = OpenFlightsSchema.execute(query, variables: variables, context: context, operation_name: operation_name)

        render json: result
      rescue => e
        raise e unless Rails.env.development?
        handle_error_in_development e
      end
    end
  end
end
